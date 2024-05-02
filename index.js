const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const nodemailer = require("nodemailer");

const authRoute = require("./Routes/authRoute");
const productRoute = require("./Routes/productRoute");
const blogRoute = require("./Routes/blogRoute");
const categoryRoute = require("./Routes/productCategoryRoute");
const blogCatRoute = require("./Routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoute");
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");
const uploadRouter = require("./Routes/uploadRoute");
const uploadSeller = require("./Routes/sellerRoute");
const cors = require("cors");

const morgan = require("morgan");

const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

dbConnect();
const asyncHandler = require("express-async-handler");
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    orgign: ["https://ahatk-ecommerce.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cors());


app.get("/", (red, res) => {
res.json("Hello");
});
app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);
app.use("/api/category", categoryRoute);
app.use("/api/blogcategory", blogCatRoute);
app.use("/api/brand", brandRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquriy", enqRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/seller", uploadSeller);

app.use("/api/coupon", couponRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
