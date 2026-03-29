export function jsonBodyParser() {
  return [
    (req, res, next) => {
      if (!req.is("application/json")) {
        return next();
      }

      let rawBody = "";

      req.setEncoding("utf8");

      req.on("data", (chunk) => {
        rawBody += chunk;
      });

      req.on("end", () => {
        if (!rawBody.trim()) {
          req.body = {};
          return next();
        }

        try {
          const sanitizedBody = rawBody.replace(/,\s*([}\]])/g, "$1");
          req.body = JSON.parse(sanitizedBody);
          return next();
        } catch (_error) {
          return res.status(422).json({
            data: null,
            success: false,
            error: "Invalid JSON payload"
          });
        }
      });

      req.on("error", () => {
        return res.status(422).json({
          data: null,
          success: false,
          error: "Invalid JSON payload"
        });
      });
    }
  ];
}
