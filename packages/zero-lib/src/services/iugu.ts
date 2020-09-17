interface PaymentTokenOptions {
  number: string;
  verification_value: string;
  first_name: string;
  last_name: string;
  month: string;
  year: string;
}

interface BaseResponse {
  data: {
    api: any;
  };
}

interface PaymentTokenResponse extends BaseResponse {
  data: {
    api: {
      id: string;
      method: string;
      extra_info: {
        brand: string;
        holder_name: string;
        display_number: string;
        bin: string;
        month: number;
        year: number;
      };
      test: boolean;
      errors:
        | string
        | {
            method: string[];
            number: string[];
            year: string[];
          };
    };
  };
}

class Iugu {
  static instance: Iugu;

  static getInstance(accountID: string) {
    if (Iugu.instance == null) {
      Iugu.instance = new Iugu(accountID);
    }
    return Iugu.instance;
  }

  accountID: string;
  apiURL = 'https://api.iugu.com';

  constructor(accountID: string) {
    this.accountID = accountID;
  }

  private async api<T extends BaseResponse>(
    url: string,
    options?: RequestInit
  ): Promise<T | undefined> {
    const headers = options?.headers != null ? (options.headers as Headers) : new Headers();
    headers.append('Content-type', 'application/json');
    try {
      const res = await fetch(this.apiURL + url, { mode: 'cors', ...options });
      const data = await res.json();
      return { data: { api: data } } as T;
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
    return;
  }

  paymentToken(
    options: PaymentTokenOptions,
    prod?: boolean
  ): Promise<PaymentTokenResponse | undefined> {
    return this.api<PaymentTokenResponse>('/v1/payment_token', {
      method: 'post',
      body: JSON.stringify({
        account_id: this.accountID,
        method: 'credit_card',
        test: !prod,
        data: { ...options },
      }),
    });
  }
}

export const iugu = Iugu.getInstance;
