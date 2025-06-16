import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "./logger/winston-logger";
import { AllExceptionsFilter } from "./logger/error.handling";
import { join } from "path";
import * as bodyParser from "body-parser";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import * as dotenv from "dotenv";
dotenv.config();

async function start() {
  try {
    const PORT = process.env.PORT || 3030;

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig),
    });

    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    );
    app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({
    origin: "*",
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

    // app.enableCors({
    //   origin: ["http://localhost:3000", "https://phono-front.vercel.app","http://3.72.21.103:3000", "https://www.phone-tech.uz", "https://phone-tech.uz"],
    //   allowedHeaders: [
    //     "Accept",
    //     "Authorization",
    //     "Content-Type",
    //     "X-Requested-With",
    //     "apollo-require-preflight",
    //   ],
    //   methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    //   credentials: true,
    // });
    app.use(
      "/graphql",
      graphqlUploadExpress({ maxFileSize: 10000000000, maxFiles: 1 })
    );

    const config = new DocumentBuilder()
      .setTitle("api.phono.uz")
      .setVersion("v-01")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "JWT",
          description: "Enter JWT token",
          in: "header",
        },
        "phono"
      )
      .build();

    app.setGlobalPrefix("api");

    app.useStaticAssets(join(__dirname, "..", "public", "uploads"), {
      prefix: "/api/uploads/",
    });

    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api/docs", app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });

    await app.listen(PORT, () => {
      console.log(
        "\n\n + ====================================================================== +"
      );
      console.log(
        `| |                                                                      | | `
      );
      console.log(
        `| | 🚀          Server started at: http://localhost:${PORT}/api          🚀 | | `
      );
      console.log(
        `| |                                                                      | | `
      );
      console.log(
        `| | 📚  Swagger API documentation at: http://localhost:${PORT}/api/docs  📚 | |`
      );
      console.log(
        `| |                                                                      | | `
      );
      console.log(
        " + ====================================================================== +"
      );
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
}

start();
