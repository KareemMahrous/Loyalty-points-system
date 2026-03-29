import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "club1911 API",
      version: "1.0.0",
      description: "Local API documentation for the club1911 backend."
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        ApiSuccessResponse: {
          type: "object",
          properties: {
            data: {
              nullable: true,
              example: null
            },
            success: {
              type: "boolean",
              example: true
            },
            error: {
              type: "string",
              example: ""
            }
          },
          required: ["data", "success", "error"]
        },
        HealthResponseData: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "ok"
            },
            message: {
              type: "string",
              example: "API is running"
            }
          }
        },
        ApiErrorResponse: {
          type: "object",
          properties: {
            data: {
              nullable: true,
              example: null
            },
            success: {
              type: "boolean",
              example: false
            },
            error: {
              type: "string",
              example: "Invalid input"
            }
          },
          required: ["data", "success", "error"]
        },
        CreateCustomerRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "MAHMOUD NADE"
            },
            mobile: {
              type: "string",
              example: "35467131"
            },
            countryCode: {
              type: "string",
              example: "BH"
            },
            email: {
              type: "string",
              format: "email",
              example: "mm@example.com"
            }
          },
          required: ["name", "mobile", "countryCode"],
          additionalProperties: false
        },
        Customer: {
          type: "object",
          example: {
            actcd: "BM1",
            name: "MAHMOUD NADE",
            cardname: "MAHMOUD NADE",
            mobile: "35467131",
            email: "mm@example.com",
            dob: null,
            gender: null,
            countryCode: "BH",
            company: "",
            tier: {
              tier_id: 4,
              tier_name: "Signature",
              cashback_percent: 15,
              range_from: 600,
              range_to: 1000000000
            },
            cashback: {
              available: "145.000",
              total_earned: "195.000"
            },
            spending: {
              cyearsale: "1500.000",
              total_sale: "1000.000"
            },
            last_transaction_date: "2025-11-20 00:00:00"
          },
          properties: {
            actcd: { type: "string", example: "AB4" },
            name: { type: "string", example: "MAHMOUD NADE" },
            cardname: { type: "string", example: "MAHMOUD NADE" },
            mobile: { type: "string", example: "35467131" },
            email: { type: "string", nullable: true, example: "mm@example.com" },
            dob: { type: "string", nullable: true, example: null },
            gender: { type: "string", nullable: true, example: null },
            countryCode: { type: "string", example: "BH" },
            company: { type: "string", example: "" },
            tier: {
              type: "object",
              properties: {
                tier_id: { type: "integer", example: 1 },
                tier_name: { type: "string", example: "Starter" },
                cashback_percent: { type: "number", example: 10 },
                range_from: { type: "number", example: 0 },
                range_to: { type: "number", example: 100 }
              }
            },
            cashback: {
              type: "object",
              properties: {
                available: { type: "string", example: "0.000" },
                total_earned: { type: "string", example: "0.000" }
              }
            },
            spending: {
              type: "object",
              properties: {
                cyearsale: { type: "string", example: "0.000" },
                total_sale: { type: "string", example: "0.000" }
              }
            },
            last_transaction_date: { type: "string", nullable: true, example: null }
          }
        },
        HealthSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/HealthResponseData"
            },
            success: {
              type: "boolean",
              example: true
            },
            error: {
              type: "string",
              example: ""
            }
          },
          example: {
            data: {
              status: "ok",
              message: "API is running"
            },
            success: true,
            error: ""
          }
        },
        CustomerSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/Customer"
            },
            success: {
              type: "boolean",
              example: true
            },
            error: {
              type: "string",
              example: ""
            }
          },
          example: {
            data: {
              actcd: "BM1",
              name: "MAHMOUD NADE",
              cardname: "MAHMOUD NADE",
              mobile: "35467131",
              email: "mm@example.com",
              dob: null,
              gender: null,
              countryCode: "BH",
              company: "",
              tier: {
                tier_id: 4,
                tier_name: "Signature",
                cashback_percent: 15,
                range_from: 600,
                range_to: 1000000000
              },
              cashback: {
                available: "145.000",
                total_earned: "195.000"
              },
              spending: {
                cyearsale: "1500.000",
                total_sale: "1000.000"
              },
              last_transaction_date: "2025-11-20 00:00:00"
            },
            success: true,
            error: ""
          }
        },
        CustomerListSuccessResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Customer"
              }
            },
            success: {
              type: "boolean",
              example: true
            },
            error: {
              type: "string",
              example: ""
            }
          },
          example: {
            data: [
              {
                actcd: "BM1",
                name: "MAHMOUD NADE",
                cardname: "MAHMOUD NADE",
                mobile: "35467131",
                email: "mm@example.com",
                dob: null,
                gender: null,
                countryCode: "BH",
                company: "",
                tier: {
                  tier_id: 4,
                  tier_name: "Signature",
                  cashback_percent: 15,
                  range_from: 600,
                  range_to: 1000000000
                },
                cashback: {
                  available: "145.000",
                  total_earned: "195.000"
                },
                spending: {
                  cyearsale: "1500.000",
                  total_sale: "1000.000"
                },
                last_transaction_date: "2025-11-20 00:00:00"
              }
            ],
            success: true,
            error: ""
          }
        },
        SendOtpRequest: {
          type: "object",
          properties: {
            mobile: {
              type: "string",
              example: "35467131"
            },
            countryCode: {
              type: "string",
              example: "BH"
            }
          },
          required: ["mobile", "countryCode"],
          additionalProperties: false
        },
        SendOtpResponseData: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "OTP sent successfully."
            },
            otp_expiry_minutes: {
              type: "integer",
              example: 5
            },
            mobile: {
              type: "string",
              example: "35467131"
            }
          }
        },
        SendOtpSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/SendOtpResponseData"
            },
            success: {
              type: "boolean",
              example: true
            },
            error: {
              type: "string",
              example: ""
            }
          },
          example: {
            data: {
              message: "OTP sent successfully.",
              otp_expiry_minutes: 5,
              mobile: "35467131"
            },
            success: true,
            error: ""
          }
        },
        AuthenticateCustomerRequest: {
          type: "object",
          properties: {
            mobile: {
              type: "string",
              example: "35467131"
            },
            otp: {
              type: "string",
              example: "000000"
            }
          },
          required: ["mobile", "otp"],
          additionalProperties: false
        },
        AuthenticatedCustomer: {
          type: "object",
          properties: {
            actcd: { type: "string", example: "AB4" },
            name: { type: "string", example: "MAHMOUD NADE" },
            mobile: { type: "string", example: "35467131" },
            email: { type: "string", nullable: true, example: "mm@example.com" }
          }
        },
        AuthenticateCustomerResponseData: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Authentication successful."
            },
            token: {
              type: "string",
              example: "jwt-token"
            },
            token_type: {
              type: "string",
              example: "Bearer"
            },
            expires_in: {
              type: "integer",
              example: 31536000
            },
            customer: {
              $ref: "#/components/schemas/AuthenticatedCustomer"
            }
          }
        },
        AuthenticateCustomerSuccessResponse: {
          type: "object",
          properties: {
            data: {
              $ref: "#/components/schemas/AuthenticateCustomerResponseData"
            },
            success: {
              type: "boolean",
              example: true
            },
            error: {
              type: "string",
              example: ""
            }
          },
          example: {
            data: {
              message: "Authentication successful.",
              token: "jwt-token",
              token_type: "Bearer",
              expires_in: 31536000,
              customer: {
                actcd: "BM1",
                name: "MAHMOUD NADE",
                mobile: "35467131",
                email: "mm@example.com"
              }
            },
            success: true,
            error: ""
          }
        }
      }
    }
  },
  apis: ["./src/interfaces/http/routes/*.js"]
};

export const swaggerSpec = swaggerJSDoc(options);
