import { volunteerSignUpPayload } from "../../../services/types/models";
// const BASE = "https://backend.qause.tech/api/v2/volunteer/auth";
interface OTPPayload {
  mobile?: string | null;
  email?: string | null;
}

export interface OTPPayloadRespone {
  success: boolean;
  data: string;
}

export interface PayloadWithOTP extends OTPPayload {
  otp: string;
}

export interface volunteerInfo {
  name: string;
  languageKnown: string[];
}

// interface OTPPayloadRespone {
// }

const BASE = "https://qause.co/api/v2/volunteer/auth";
const BASE2 = "https://qause.co/api/v2/volunteer";

export async function requestSignupOTP(data: volunteerSignUpPayload) {
  const res = await fetch(BASE + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok === false) {
    const error = await res.json();
    throw error;
  } else {
    const result = await res.json();
    return result;
  }
}

export interface SignUpVerifyResponse {
  success: boolean;
  data: {
    token: string;
    profilePicture: string;
    isMobileVerified: boolean;
    isEmailVerified: boolean;
  };
}

export async function verifySignupOTP(data: volunteerSignUpPayload) {
  const res = await fetch(BASE + "/register-verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok === false) {
    const error = await res.json();
    throw error;
  } else {
    const result = await res.json();
    return result;
  }
}

export async function requestLoginOTP(data: volunteerSignUpPayload) {
  try {
    const res: any = await fetch(BASE + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (e: Error | any) {
    return {
      success: false,
      data: e.message,
    };
  }
}

export async function verifyLoginOTP(data: PayloadWithOTP) {
  try {
    const res: OTPPayloadRespone | any = await fetch(BASE + "/login-verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await res.json();
    if (responseJson.success) {
      return responseJson;
    } else {
      throw new Error(
        responseJson.error || JSON.stringify(responseJson.errors)
      );
    }
  } catch (e: Error | any) {
    return {
      success: false,
      data: e.message,
    };
  }
}

export async function postVolunteerInfo(data: volunteerInfo) {
  try {
    const res: OTPPayloadRespone | any = await fetch(BASE2 + "/personal", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
      body: JSON.stringify(data),
    });
    const responseJson = await res.json();
    if (responseJson.success) {
      return responseJson;
    } else {
      throw new Error(
        responseJson.error || JSON.stringify(responseJson.errors)
      );
    }
  } catch (e: Error | any) {
    return {
      success: false,
      data: e.message,
    };
  }
}

export async function postVolunteerPassions(data: { passions: string[] }) {
  try {
    const res: OTPPayloadRespone | any = await fetch(BASE2 + "/passions", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
      body: JSON.stringify(data),
    });
    const responseJson = await res.json();
    if (responseJson.success) {
      return responseJson;
    } else {
      throw new Error(
        responseJson.error || JSON.stringify(responseJson.errors)
      );
    }
  } catch (e: Error | any) {
    return {
      success: false,
      data: e.message,
    };
  }
}

export async function postVolunteerLocation(data: {
  formattedAddress: string;
  lat: number | null;
  long: number | null;
}) {
  try {
    const res: OTPPayloadRespone | any = await fetch(BASE2 + "/account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("TOKEN")}`,
      },
      body: JSON.stringify(data),
    });
    const responseJson = await res.json();
    if (responseJson.success) {
      return responseJson;
    } else {
      throw new Error(
        responseJson.error || JSON.stringify(responseJson.errors)
      );
    }
  } catch (e: Error | any) {
    return {
      success: false,
      data: e.message,
    };
  }
}
