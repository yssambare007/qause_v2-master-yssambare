import type { ProfileData } from "../services/types/needs";

export const validateEmail = (email: string): boolean => {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
};

// export const base_url = "https://backend.qause.tech/api/";
// export const base_url_login = "https://backend.qause.tech/api/";
export const base_url = "https://qause.co/api/";
export const base_url_login = "https://qause.co/api/";

export const requestOptions = (body: any) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const reverseArray = (string: string) => {
  if (string) {
    const newArray = string.slice();
    return [...newArray].reverse();
  }
  return [];
};

export const S3Bucket =
  "https://s3.ap-south-1.amazonaws.com/qause.development/ngo/";

export const getImageUrlForS3Bucket = (
  organizationId: string,
  imageId?: string
) => {
  if (!imageId) {
    return "/images/logo.png";
  }
  if (imageId.includes("https://")) return imageId;
  return S3Bucket + organizationId + "/" + imageId;
};

export const imageLinkBuilder = (
  organizationId: string,
  imageId: string
): string => {
  return S3Bucket + organizationId + "/event/" + imageId;
};

export const getPopulatePathValueFromProfile = (
  profile: ProfileData,
  populatePath: string
) => {
  const value = populatePath
    .split(".")
    .reduce(
      (target, key) =>
        (typeof target != "string" && target && target[key]) || "",
      profile as { [key: string]: string | any } | string
    );
  if (typeof value == "string") return value;
  return "";
};

export function dataURLtoBlob(dataURL: any) {
  const byteString = Buffer.from(dataURL.split(",")[1], "base64").toString();
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export function capitalizeEachFirstLetter(string: string) {
  if (string && string.length) {
    const words: Array<string> = string?.split(" ");
    return words
      ?.map((word: string) => {
        return word[0]?.toUpperCase() + word.substring(1);
      })
      .join(" ");
  } else return "";
}
