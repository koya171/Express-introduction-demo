const expres = require("express");
const app = expres();
const { products } = require("./data");

app.get("/", (req, res) => {
  res.send('<h1>Home page</h1><a href="/api/products">products</a>');
});
app.get("/api/products", (req, res) => {
  const newproducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.status(200).json(newproducts);
});

app.get("/api/products/:productID", (req, res) => {
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProduct) {
    return res.status(404).send("product Does not exist");
  }
  return res.json(singleProduct);
});
app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("Hello world..");
});
app.get('/api/v1/query', (req, res) => {
  console.log(req.query)
  const { search, limit } = req.query
  console.log(search, limit);
  let sortedProducts = [...products]

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search)
    })
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send('no products matched your search');
    return res.status(200).json({ sucess: true, data: [] })
  }
  res.status(200).json(sortedProducts)
})
app.listen(5000, () => {
  console.log("listening server 5000.....");
});
