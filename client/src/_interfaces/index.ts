export interface IGlobalState {
  global: {
    userId: string;
  };
}

// users
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

// customers

// products
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

// transactions
export interface ITransaction {
  _id: string;
  userId: string;
  cost: string;
  products: {
    id: string; // replace ObjectId with string for simplicity
    quantity: number; // equivalent to "of" in the server interface
  }[];
}

export interface ITransactionResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: ITransaction[];
}

// user locations
export interface IGeography {
  id: string; // ISO3 code of the country
  value: number; // Number of users from this country
}

export interface IGeographyResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: IGeography[];
}
