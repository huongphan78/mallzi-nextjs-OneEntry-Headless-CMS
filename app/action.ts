"use server";
import { productType } from '@/lib/interface';
import { defineOneEntry } from 'oneentry'
import { IFormsEntity } from 'oneentry/dist/forms/formsInterfaces';
import { IProductsEntity } from 'oneentry/dist/products/productsInterfaces';

const {
  Admins,
  AttributesSets,
  Blocks,
  Forms,
  Orders,
  FormData,
  FileUploading,
  GeneralTypes,
  Locales,
  Menus,
  Pages,
  Products,
  ProductStatuses,
  System,
  Templates,
  TemplatePreviews,
  Payments
} = defineOneEntry('https://mallzii.oneentry.cloud', { token: process.env.ONEENTRY_TOKEN, langCode: 'en' })

import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

/* ------------------------------ Pages helpers ------------------------------ */

export async function getPageData(url: string) {
  const value = await Pages.getPageByUrl(url, 'en_US')

  const bannerData = {
    title: value.attributeValues?.maintitle.value,
    image: value.attributeValues?.mainimage.value[0].downloadLink
  }

  if (value.attributeValues?.hasOwnProperty('categoriestitle') && value.attributeValues?.categoriestitle.value != '') {
    const categoriesData = {
      titles: value.attributeValues?.categoriestitle.value.split(","),
      images: value.attributeValues?.categoriesimage.value.map((item: any) => item.downloadLink),
      links: value.attributeValues?.categorieslink.value.split(",")
    }
    const categoriesObject = categoriesData.titles.map((title: string, index: any) => ({
      id: "cate" + title,
      title: title.toLocaleUpperCase(),
      imgSrc: categoriesData.images[index],
      url: categoriesData.links[index]
    }));
    return { bannerData, categoriesObject }
  }

  return { bannerData }
}

/* ---------------------------- Products helpers ----------------------------- */

/** Đọc Radio Button từ attributeValues, trả { value, extra } */
const readRadio = (av: any, key: string): { value?: string; extra?: any } => {
  const a = av?.[key];
  if (!a) return { value: undefined, extra: undefined };

  const raw = a?.value;
  let value: string | undefined;

  if (typeof raw === 'string') value = raw;
  else if (raw && typeof raw === 'object') value = raw.value ?? raw.label;
  else if (Array.isArray(raw)) value = String(raw[0]);
  else if (raw != null) value = String(raw);

  const extra = a?.additionalValue;
  return { value, extra };
};

/** Đọc String từ attributeValues (vd: url) */
const readString = (av: any, key: string): string | undefined => {
  const a = av?.[key];
  if (!a) return undefined;
  const v = a?.value ?? a;
  return typeof v === 'string' ? v : String(v);
};

/** Chuẩn hóa product từ OneEntry về productType[] */
const parseProductObject = (value: any): productType[] => {
  if (!value) return [];

  // Single product
  if (value.attributeValues) {
    const av = value.attributeValues;
    const { value: color, extra: colorHex } = readRadio(av, 'color');
    const { value: size } = readRadio(av, 'size');
    const externalUrl = readString(av, 'url'); // <-- lấy link ngoài theo marker 'url'

    return [{
      id: value.id,
      src: av.images?.value?.[0]?.downloadLink ?? "",
      title: av.title?.value ?? "",
      price: av.price?.value ?? 0,
      quantity: av.quantity?.value ?? 0,
      description: av.description?.value ?? "",
      images: av.images?.value?.map((v: any) => v.downloadLink) ?? [],
      categories: value.categories ?? [],
      // bổ sung:
      color,
      size,
      colorHex,
      url: externalUrl,            // <--- có sẵn ở FE là product.url
      attributeValues: av,
    }];
  }

  // List (items)
  if (value.items && Array.isArray(value.items)) {
    return value.items.map((product: IProductsEntity) => {
      const av = product.attributeValues;
      const { value: color, extra: colorHex } = readRadio(av, 'color');
      const { value: size } = readRadio(av, 'size');
      const externalUrl = readString(av, 'url'); // <-- lấy link ngoài theo marker 'url'

      return {
        id: product.id,
        src: av.images?.value?.[0]?.downloadLink ?? "",
        title: av.title?.value ?? "",
        price: av.price?.value ?? 0,
        quantity: av.quantity?.value ?? 0,
        description: av.description?.value ?? "",
        images: av.images?.value?.map((v: any) => v.downloadLink) ?? [],
        categories: product.categories ?? [],
        // bổ sung:
        color,
        size,
        colorHex,
        url: externalUrl,          // <--- có sẵn ở FE là product.url
        attributeValues: av,
      };
    });
  }

  return [];
};

/* --------------------------------- APIs ---------------------------------- */

export async function getProductsByCategory(url: string) {
  const value = await Products.getProductsByPageUrl(url, [], 'en_US')
  const products = parseProductObject(value)
  return products
}

export async function getProductByID(id: number) {
  const value = await Products.getProductById(id, 'en_US')
  const products = parseProductObject(value)
  return products;
}

/* ------------------------------ Cart helpers ------------------------------ */

export const parseCartDetail = (cartDetails: any) => {
  const result = Object.keys(cartDetails).map(key => {
    const item = cartDetails[key];
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      attributes: item.attributes, // có thể chứa size/color nếu bạn truyền khi addItem
    };
  });
  const total = result.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  return { result, total }
}

/* ------------------------------- Forms APIs ------------------------------- */

const parseFormDetails = (form: IFormsEntity) => {
  if (!form.attributes || !Array.isArray(form.attributes)) return [];
  const formFields = form.attributes.map(att => att.localizeInfos?.title ?? "");
  return formFields
};

export async function getFormByMarker(marker: string) {
  const value: any = await Forms.getFormByMarker(marker, "en_US");
  const formFields = parseFormDetails(value);
  return formFields
}

/* ------------------------------- Mail sender ------------------------------ */

export async function postFormData(data: any) {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  })

  const plainText = `
    Name: ${data.name}
    Email: ${data.email}
    Subject: ${data.subject}
    Message: ${data.message}

    Cart Items:
    ${data.cart.map((item: any) => `
      - Item: ${item.name}
        Description: ${item.description}
        Price: $${item.price}
        Quantity: ${item.quantity}
        ${item.attributes ? `Size: ${item.attributes.size ?? '-'}, Color: ${item.attributes.color ?? '-'}` : ''}
        Image: ${item.image}
    `).join('')}

    Total: $${data.total}
  `;

  const htmlText = `
    <h2>Order / Contact Details</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong> ${data.message}</p>

    <h3>Cart Items:</h3>
    <ul>
      ${data.cart.map((item: any) => `
        <li style="margin-bottom:12px">
          <p><strong>Item:</strong> ${item.name}</p>
          <p><strong>Description:</strong> ${item.description}</p>
          <p><strong>Price:</strong> $${item.price}</p>
          <p><strong>Quantity:</strong> ${item.quantity}</p>
          ${item.attributes ? `<p><strong>Size:</strong> ${item.attributes.size ?? '-'} — <strong>Color:</strong> ${item.attributes.color ?? '-'}</p>` : ''}
          <p><img src="${item.image}" alt="${item.name}" width="100" /></p>
        </li>
      `).join('')}
    </ul>
    <p><strong>Total:</strong> $${data.total}</p>
  `;

  const orderEmailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    subject: `Order/Contact from: ${data.name} (${data.email})`,
    text: plainText,
    html: htmlText
  };

  const confirmationEmailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: data.email,
    subject: `We received your request: ${data.subject}`,
    text: plainText,
    html: htmlText
  };

  const sendMailPromise = (emailOptions: any) =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(emailOptions, function (err) {
        if (!err) resolve('Email sent');
        else reject(err.message);
      });
    });

  try {
    await Promise.all([
      sendMailPromise(confirmationEmailOptions),
      sendMailPromise(orderEmailOptions)
    ])
    return { status: 200, message: "Email sent" }
  } catch (err) {
    return { status: 500, message: "Failed to send email" }
  }
}
