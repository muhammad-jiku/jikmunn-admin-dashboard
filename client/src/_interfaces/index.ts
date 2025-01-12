export interface IGlobalState {
  global: {
    userId: string;
  };
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  state: string | null; // Allow null for the state
  country: string;
  occupation: string;
  phoneNumber: string;
  transactions: string[]; // Array of transaction IDs
  role: 'user' | 'admin' | 'superadmin'; // Restrict role to specific values
}

export interface IUserResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: IUser[];
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
  stat: {
    productId: string;
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
    year: number;
    monthlyData: [
      {
        month: string;
        totalSales: number;
        totalUnits: number;
      }
    ];
    dailyData: [
      {
        date: string;
        totalSales: number;
        totalUnits: number;
      }
    ];
  };
}

export interface IProductResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: IProduct[];
}
