export interface IAuthSuccessResponse {
  message: string;
  user: {
    userId: string;
    email: string;
  };
}
