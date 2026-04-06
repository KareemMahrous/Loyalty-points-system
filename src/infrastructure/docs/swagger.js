const defaultServerUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "club1911 API",
    version: "1.0.0",
    description: "Local API documentation for the club1911 backend.",
  },
  tags: [
    {
      name: "Auth",
      description: "OTP and authentication endpoints",
    },
    {
      name: "Customer",
      description: "Customer profile and customer data endpoints",
    },
    {
      name: "Discount",
      description: "Discount conversion and discount code endpoints",
    },
    {
      name: "Health",
      description: "Health check endpoints",
    },
  ],
  servers: [
    {
      url: defaultServerUrl,
      description: process.env.VERCEL_URL ? "Vercel deployment" : "Local development server",
    },
  ],
  components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ApiSuccessResponse: {
          type: "object",
          properties: {
            data: {
              nullable: true,
              example: null,
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Request completed successfully.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          required: ["data", "success", "message", "error"],
        },
        HealthResponseData: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "ok",
            },
            message: {
              type: "string",
              example: "API is running",
            },
          },
        },
        ApiErrorResponse: {
          type: "object",
          properties: {
            // data: {
            //   nullable: true,
            //   example: null
            // },
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Request failed.",
            },
            error: {
              type: "string",
              example: "Invalid input",
            },
          },
          required: ["data", "success", "message", "error"],
        },
        CreateCustomerRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "MAHMOUD NADE",
            },
            mobile: {
              type: "string",
              example: "35467131",
            },
            countryCode: {
              type: "string",
              example: "BH",
            },
            email: {
              type: "string",
              format: "email",
              example: "mm@example.com",
            },
          },
          required: ["name", "mobile", "countryCode"],
          additionalProperties: false,
        },
        UpdateCustomerCashbackRequest: {
          type: "object",
          properties: {
            available: {
              type: "string",
              example: "145.000",
            },
            total_earned: {
              type: "string",
              example: "195.000",
            },
          },
          required: ["available", "total_earned"],
          additionalProperties: false,
        },
        UpdateCustomerProfileRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "MAHMOUD NADE",
            },
            email: {
              type: "string",
              format: "email",
              nullable: true,
              example: "mm@example.com",
            },
            dob: {
              type: "string",
              nullable: true,
              example: "2000-12-12",
            },
          },
          additionalProperties: false,
        },
        ConvertDiscountRequest: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              nullable: true,
              example: "mm@example.com",
            },
            value: {
              type: "string",
              example: "25.000",
            },
          },
          required: ["value"],
          additionalProperties: false,
        },
        ConvertDiscountResponseData: {
          type: "object",
          properties: {
            discount_code: {
              type: "string",
              example: "BH1-A1B2C3",
            },
          },
        },
        DiscountCodeItem: {
          type: "object",
          properties: {
            discount_id: {
              type: "string",
              example: "18",
            },
            actcd: {
              type: "string",
              example: "BH4",
            },
            discount_code: {
              type: "string",
              example: "BH4-321893",
            },
            amount: {
              type: "string",
              example: "50.000",
            },
            country: {
              type: "string",
              example: "BH",
            },
            date: {
              type: "string",
              example: "2026-01-01 12:08:24",
            },
          },
        },
        CustomerTransactionItem: {
          type: "object",
          properties: {
            transaction_id: {
              type: "integer",
              example: 84,
            },
            actcd: {
              type: "string",
              example: "BH1",
            },
            total: {
              type: "string",
              example: "-25.000",
            },
            date: {
              type: "string",
              example: "2025-12-01",
            },
            invoice: {
              type: "string",
              example: "1000",
            },
            cash_back: {
              type: "string",
              example: "-25.000",
            },
            tier_id: {
              type: "integer",
              example: 1,
            },
            p_date: {
              type: "string",
              example: "2025-11-26",
            },
          },
        },
        CustomerTransactionsData: {
          type: "object",
          properties: {
            actcd: {
              type: "string",
              example: "BH1",
            },
            customer_name: {
              type: "string",
              example: "MAHMOUD NADE",
            },
            total_cashback: {
              type: "string",
              example: "195.000",
            },
            points: {
              type: "string",
              example: "145.000",
            },
            transaction_count: {
              type: "integer",
              example: 4,
            },
            transactions: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CustomerTransactionItem",
              },
            },
          },
        },
        CustomerProfileSummary: {
          type: "object",
          properties: {
            actcd: {
              type: "string",
              example: "BH1",
            },
            name: {
              type: "string",
              example: "MAHMOUD NADE UPDATED",
            },
            cardname: {
              type: "string",
              example: "MAHMOUD NADE UPDATED",
            },
            mobile: {
              type: "string",
              example: "35467131",
            },
            email: {
              type: "string",
              nullable: true,
              example: "updated@example.com",
            },
            dob: {
              type: "string",
              nullable: true,
              example: "2000-12-12",
            },
            gender: {
              type: "string",
              nullable: true,
              example: null,
            },
            country: {
              type: "string",
              example: "Bahrain",
            },
            company: {
              type: "string",
              nullable: true,
              example: null,
            },
            last_transaction_date: {
              type: "string",
              nullable: true,
              example: null,
            },
          },
        },
        CustomerQrCodeData: {
          type: "object",
          properties: {
            actcd: {
              type: "string",
              example: "BH1",
            },
            customer_name: {
              type: "string",
              example: "MAHMOUD NADE",
            },
            cashback: {
              type: "string",
              example: "145.000",
            },
            tier_id: {
              type: "integer",
              example: 4,
            },
            tier_name: {
              type: "string",
              example: "Signature",
            },
            tier_cashback_percent: {
              type: "number",
              example: 15,
            },
            tier_range_from: {
              type: "number",
              example: 600,
            },
            tier_range_to: {
              type: "number",
              example: 1000000000,
            },
            cyearsale: {
              type: "string",
              example: "1500.000",
            },
            qr_code_data: {
              type: "string",
              example: "BH1",
            },
            qr_code_url: {
              type: "string",
              example: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=BH1",
            },
          },
        },
        Customer: {
          type: "object",
          example: {
            actcd: "BH1",
            name: "MAHMOUD NADE",
            cardname: "MAHMOUD NADE",
            mobile: "35467131",
            email: "mm@example.com",
            dob: null,
            gender: null,
            country: "Bahrain",
            company: null,
            tier: {
              tier_id: 4,
              tier_name: "Signature",
              cashback_percent: 15,
              range_from: 600,
              range_to: 1000000000,
            },
            cashback: {
              available: "145.000",
              total_earned: "195.000",
            },
            spending: {
              cyearsale: "1500.000",
              total_sale: "1000.000",
            },
            last_transaction_date: "2025-11-20 00:00:00",
          },
          properties: {
            actcd: { type: "string", example: "AB4" },
            name: { type: "string", example: "MAHMOUD NADE" },
            cardname: { type: "string", example: "MAHMOUD NADE" },
            mobile: { type: "string", example: "35467131" },
            email: {
              type: "string",
              nullable: true,
              example: "mm@example.com",
            },
            dob: { type: "string", nullable: true, example: null },
            gender: { type: "string", nullable: true, example: null },
            country: { type: "string", example: "Bahrain" },
            company: { type: "string", nullable: true, example: null },
            tier: {
              type: "object",
              properties: {
                tier_id: { type: "integer", example: 1 },
                tier_name: { type: "string", example: "Starter" },
                cashback_percent: { type: "number", example: 10 },
                range_from: { type: "number", example: 0 },
                range_to: { type: "number", example: 100 },
              },
            },
            cashback: {
              type: "object",
              properties: {
                available: { type: "string", example: "0.000" },
                total_earned: { type: "string", example: "0.000" },
              },
            },
            spending: {
              type: "object",
              properties: {
                cyearsale: { type: "string", example: "0.000" },
                total_sale: { type: "string", example: "0.000" },
              },
            },
            last_transaction_date: {
              type: "string",
              nullable: true,
              example: null,
            },
          },
        },
        HealthSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/HealthResponseData",
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Health check completed successfully.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          example: {
            success: true,
            message: "Health check completed successfully.",
            error: "",
            data: {
              status: "ok",
              message: "API is running",
            },
          },
        },
        CustomerSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/Customer",
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Customer fetched successfully.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          example: {
            success: true,
            message: "Customer fetched successfully.",
            error: "",
            data: {
              actcd: "BH1",
              name: "MAHMOUD NADE",
              cardname: "MAHMOUD NADE",
              mobile: "35467131",
              email: "mm@example.com",
              dob: null,
              gender: null,
              country: "Bahrain",
              company: null,
              tier: {
                tier_id: 4,
                tier_name: "Signature",
                cashback_percent: 15,
                range_from: 600,
                range_to: 1000000000,
              },
              cashback: {
                available: "145.000",
                total_earned: "195.000",
              },
              spending: {
                cyearsale: "1500.000",
                total_sale: "1000.000",
              },
              last_transaction_date: "2025-11-20 00:00:00",
            },
          },
        },
        CustomerCashbackSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/Customer",
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Customer cashback updated successfully.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          example: {
            success: true,
            message: "Customer cashback updated successfully.",
            error: "",
            data: {
              actcd: "BH1",
              name: "MAHMOUD NADE",
              cardname: "MAHMOUD NADE",
              mobile: "35467131",
              email: "mm@example.com",
              dob: null,
              gender: null,
              country: "Bahrain",
              company: null,
              tier: {
                tier_id: 2,
                tier_name: "Bronze",
                cashback_percent: 12,
                range_from: 100,
                range_to: 200,
              },
              cashback: {
                available: "145.000",
                total_earned: "195.000",
              },
              spending: {
                cyearsale: "0.000",
                total_sale: "0.000",
              },
              last_transaction_date: null,
            },
          },
        },
        UpdateCustomerProfileSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/CustomerProfileSummary",
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Customer profile updated successfully.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          example: {
            success: true,
            message: "Customer profile updated successfully.",
            error: "",
            data: {
              actcd: "BH1",
              name: "MAHMOUD NADE UPDATED",
              cardname: "MAHMOUD NADE UPDATED",
              mobile: "35467131",
              email: "updated@example.com",
              dob: "2000-12-12",
              gender: null,
              country: "Bahrain",
              company: null,
              last_transaction_date: null,
            },
          },
        },
        ConvertDiscountSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/ConvertDiscountResponseData",
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Discount code created successfully.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          example: {
            success: true,
            message: "Discount code created successfully.",
            error: "",
            data: {
              discount_code: "BH1-A1B2C3",
            },
          },
        },
        ListDiscountCodesSuccessResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/DiscountCodeItem",
              },
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Discount codes fetched successfully.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          example: {
            success: true,
            message: "Discount codes fetched successfully.",
            error: "",
            data: [
              {
                discount_id: "18",
                actcd: "BH4",
                discount_code: "BH4-321893",
                amount: "50.000",
                country: "BH",
                date: "2026-01-01 12:08:24",
              },
            ],
          },
        },
        CustomerQrCodeSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/CustomerQrCodeData",
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Customer QR code fetched successfully.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          example: {
            success: true,
            message: "Customer QR code fetched successfully.",
            error: "",
            data: {
              actcd: "BH1",
              customer_name: "MAHMOUD NADE",
              cashback: "145.000",
              tier_id: 4,
              tier_name: "Signature",
              tier_cashback_percent: 15,
              tier_range_from: 600,
              tier_range_to: 1000000000,
              cyearsale: "1500.000",
              qr_code_data: "BH1",
              qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=BH1",
            },
          },
        },
        CustomerTransactionsSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/CustomerTransactionsData",
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Customer transactions fetched successfully.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          example: {
            success: true,
            message: "Customer transactions fetched successfully.",
            error: "",
            data: {
              actcd: "BH1",
              customer_name: "MAHMOUD NADE",
              total_cashback: "195.000",
              points: "145.000",
              transaction_count: 1,
              transactions: [
                {
                  transaction_id: 84,
                  actcd: "BH1",
                  total: "-25.000",
                  date: "2025-12-01",
                  invoice: "1000",
                  cash_back: "-25.000",
                  tier_id: 1,
                  p_date: "2025-11-26",
                },
              ],
            },
          },
        },
        CreateCustomerResponseData: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Customer created successfully.",
            },
          },
        },
        CreateCustomerSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/CreateCustomerResponseData",
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Customer created successfully.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          example: {
            success: true,
            message: "Customer created successfully.",
            error: "",
            data: {
              message: "Customer created successfully.",
            },
          },
        },
        CustomerListSuccessResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Customer",
              },
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Customers fetched successfully.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          example: {
            success: true,
            message: "Customers fetched successfully.",
            error: "",
            data: [
              {
                actcd: "BH1",
                name: "MAHMOUD NADE",
                cardname: "MAHMOUD NADE",
                mobile: "35467131",
                email: "mm@example.com",
                dob: null,
                gender: null,
                country: "Bahrain",
                company: null,
                tier: {
                  tier_id: 4,
                  tier_name: "Signature",
                  cashback_percent: 15,
                  range_from: 600,
                  range_to: 1000000000,
                },
                cashback: {
                  available: "145.000",
                  total_earned: "195.000",
                },
                spending: {
                  cyearsale: "1500.000",
                  total_sale: "1000.000",
                },
                last_transaction_date: "2025-11-20 00:00:00",
              },
            ],
          },
        },
        SendOtpRequest: {
          type: "object",
          properties: {
            mobile: {
              type: "string",
              example: "35467131",
            },
            countryCode: {
              type: "string",
              example: "BH",
            },
          },
          required: ["mobile", "countryCode"],
          additionalProperties: false,
        },
        SendOtpResponseData: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "OTP sent successfully.",
            },
            otp_expiry_minutes: {
              type: "integer",
              example: 5,
            },
            mobile: {
              type: "string",
              example: "35467131",
            },
          },
        },
        SendOtpSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/SendOtpResponseData",
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "OTP sent successfully.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          example: {
            success: true,
            message: "OTP sent successfully.",
            error: "",
            data: {
              message: "OTP sent successfully.",
              otp_expiry_minutes: 5,
              mobile: "35467131",
            },
          },
        },
        StoreOtpResponseData: {
          type: "object",
          properties: {
            otp: {
              type: "string",
              example: "4821",
            },
            expire_in: {
              type: "integer",
              example: 60,
            },
          },
        },
        StoreOtpSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/StoreOtpResponseData",
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "OTP stored successfully.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          example: {
            success: true,
            message: "OTP stored successfully.",
            error: "",
            data: {
              otp: "4821",
              expire_in: 60,
            },
          },
        },
        AuthenticateCustomerRequest: {
          type: "object",
          properties: {
            mobile: {
              type: "string",
              example: "35467131",
            },
            otp: {
              type: "string",
              example: "000000",
            },
          },
          required: ["mobile", "otp"],
          additionalProperties: false,
        },
        AuthenticatedCustomer: {
          type: "object",
          properties: {
            actcd: { type: "string", example: "AB4" },
            name: { type: "string", example: "MAHMOUD NADE" },
            mobile: { type: "string", example: "35467131" },
            email: {
              type: "string",
              nullable: true,
              example: "mm@example.com",
            },
          },
        },
        AuthenticateCustomerResponseData: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Authentication successful.",
            },
            token: {
              type: "string",
              example: "jwt-token",
            },
            token_type: {
              type: "string",
              example: "Bearer",
            },
            expires_in: {
              type: "integer",
              example: 31536000,
            },
            customer: {
              $ref: "#/components/schemas/AuthenticatedCustomer",
            },
          },
        },
        AuthenticateCustomerSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/AuthenticateCustomerResponseData",
            },
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Authentication successful.",
            },
            error: {
              type: "string",
              example: "",
            },
          },
          example: {
            success: true,
            message: "Authentication successful.",
            error: "",
            data: {
              message: "Authentication successful.",
              token: "jwt-token",
              token_type: "Bearer",
              expires_in: 31536000,
              customer: {
                actcd: "BH1",
                name: "MAHMOUD NADE",
                mobile: "35467131",
                email: "mm@example.com",
              },
            },
          },
        },
      },
  },
  paths: {
    "/api/health": {
      get: {
        summary: "Check API health",
        tags: ["Health"],
        responses: {
          200: {
            description: "API is running",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/HealthSuccessResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/customer": {
      get: {
        summary: "List customers",
        tags: ["Customer"],
        responses: {
          200: {
            description: "Customers returned successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CustomerListSuccessResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/customer/create": {
      post: {
        summary: "Create customer",
        tags: ["Customer"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateCustomerRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Customer created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreateCustomerSuccessResponse",
                },
              },
            },
          },
          422: {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/customer/sendOtp": {
      post: {
        summary: "Send customer OTP",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SendOtpRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "OTP sent successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SendOtpSuccessResponse",
                },
              },
            },
          },
          422: {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/customer/storeOtp": {
      post: {
        summary: "Generate and store customer-specific OTP",
        tags: ["Auth"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "OTP stored successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/StoreOtpSuccessResponse",
                },
              },
            },
          },
          401: {
            description: "Authentication failed",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/customer/authenticate": {
      post: {
        summary: "Authenticate customer with OTP",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AuthenticateCustomerRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Authentication successful",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AuthenticateCustomerSuccessResponse",
                },
              },
            },
          },
          401: {
            description: "Authentication failed",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
          422: {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/customer/getProfile": {
      get: {
        summary: "Get authenticated customer profile",
        tags: ["Customer"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Customer profile returned successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CustomerSuccessResponse",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/customer/getQRCode": {
      get: {
        summary: "Get authenticated customer QR code data",
        tags: ["Customer"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Customer QR code data returned successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CustomerQrCodeSuccessResponse",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/customer/transaction": {
      get: {
        summary: "Get authenticated customer transactions",
        tags: ["Customer"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Customer transactions returned successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CustomerTransactionsSuccessResponse",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/customer/updateProfile": {
      patch: {
        summary: "Update authenticated customer profile",
        tags: ["Customer"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateCustomerProfileRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Customer profile updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateCustomerProfileSuccessResponse",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
          422: {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/customer/cashback/{actcd}": {
      patch: {
        summary: "Update customer cashback and tier",
        tags: ["Customer"],
        parameters: [
          {
            in: "path",
            name: "actcd",
            required: true,
            schema: {
              type: "string",
            },
            example: "BH1",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateCustomerCashbackRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Customer cashback updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CustomerCashbackSuccessResponse",
                },
              },
            },
          },
          422: {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/customer/discount/convert": {
      post: {
        summary: "Convert cashback available into a discount code",
        tags: ["Discount"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ConvertDiscountRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Discount code created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ConvertDiscountSuccessResponse",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
          422: {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/customer/discount": {
      get: {
        summary: "List authenticated customer discount codes",
        tags: ["Discount"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Discount codes returned successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ListDiscountCodesSuccessResponse",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiErrorResponse",
                },
              },
            },
          },
        },
      },
    },
  },
};
