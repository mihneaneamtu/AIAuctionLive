export const successResponse = (data: any, message: string = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (message: string, errors: any = null) => {
  return {
    success: false,
    message,
    errors,
  };
};

export const paginatedResponse = (data: any, page: number, limit: number, total: number) => {
  return {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};
