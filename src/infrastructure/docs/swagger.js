import swaggerJSDoc from "swagger-jsdoc";

const defaultServerUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "club1911 API",
      version: "1.0.0",
      description: "Local API documentation for the club1911 backend.",
    },
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
            data: {
              status: "ok",
              message: "API is running",
            },
            success: true,
            message: "Health check completed successfully.",
            error: "",
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
            success: true,
            message: "Customer fetched successfully.",
            error: "",
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
            success: true,
            message: "Customer cashback updated successfully.",
            error: "",
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
            success: true,
            message: "Customer profile updated successfully.",
            error: "",
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
            success: true,
            message: "Customer QR code fetched successfully.",
            error: "",
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
            data: {
              message: "Customer created successfully.",
            },
            success: true,
            message: "Customer created successfully.",
            error: "",
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
            success: true,
            message: "Customers fetched successfully.",
            error: "",
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
            data: {
              message: "OTP sent successfully.",
              otp_expiry_minutes: 5,
              mobile: "35467131",
            },
            success: true,
            message: "OTP sent successfully.",
            error: "",
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
            success: true,
            message: "Authentication successful.",
            error: "",
          },
        },
      },
    },
  },
  apis: ["./src/interfaces/http/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
