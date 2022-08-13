const db = require("./connection");
const { User, Product, Category, Order } = require("../models");
const bcrypt = require("bcrypt");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Costumes" },
    { name: "Books" },
    { name: "Toys" },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Dark Knight",
      isRented: true,
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "",
      category: categories[0]._id,
      pricePerDay: 10.0,
      comments: [
        {
          author: "Sarah",
          comment: "In great condition",
          createdAt: "2022-08-06T07:49:32.669+00:00",
        },
      ],
    },
    {
      name: "Spider Man",
      description:
        "Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.",
      image: "canned-coffee.jpg",
      category: categories[0]._id,
      isRented: true,
      pricePerDay: 10.0,
      comments: [
        {
          author: "William",
          comment: "Looks new, well maintaied",
          createdAt: "2022-08-06T07:49:32.669+00:00",
        },
      ],
    },
    {
      name: "Tales at Bedtime",
      category: categories[1]._id,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.",
      image: "bedtime-book.jpg",
      isRented: false,
      pricePerDay: 2.0,
      comments: [
        {
          author: "William",
          comment: "Looks new, well maintaied",
          createdAt: "2022-08-06T07:49:32.669+00:00",
        },
        {
          author: "Robin",
          comment: "Lovely book",
          createdAt: "2022-08-06T07:49:32.669+00:00",
        },
      ],
    },
    {
      name: "Spinning Top",
      category: categories[2]._id,
      description:
        "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      image: "spinning-top.jpg",
      isRented: false,
      pricePerDay: 1.0,
      comments: [
        {
          author: "Roman",
          comment: "Looks new, well maintaied",
          createdAt: "2022-08-06T07:49:32.669+00:00",
        },
        {
          author: "Logan",
          comment: "Lovely book",
          createdAt: "2022-08-06T07:49:32.669+00:00",
        },
      ],
    },
    {
      name: "Set of Plastic Horses",
      category: categories[2]._id,
      description:
        "Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.",
      image: "plastic-horses.jpg",
      isRented: false,
      pricePerDay: 2.0,
      comments: [
        {
          author: "Courtney",
          comment: "Looks new, well maintaied",
          createdAt: "2022-08-06T07:49:32.669+00:00",
        },
        {
          author: "Salma",
          comment: "Lovely Horses, well sanitized",
          createdAt: "2022-08-06T07:49:32.669+00:00",
        },
      ],
    },
    {
      name: "Teddy Bear",
      category: categories[2]._id,
      description:
        "Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.",
      image: "teddy-bear.jpg",
      isRented: true,
      pricePerDay: 4.0,
      comments: [
        {
          author: "Harris",
          comment: "Looks new, well maintaied",
          createdAt: "2022-08-06T07:49:32.669+00:00",
        },
        {
          author: "Biden",
          comment: "Lovely Horses, well sanitized",
          createdAt: "2022-08-06T07:49:32.669+00:00",
        },
      ],
    },
    {
      name: "Alphabet Blocks",
      category: categories[2]._id,
      description:
        "Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.",
      image: "alphabet-blocks.jpg",
      isRented: true,
      pricePerDay: 4.0,
      comments: [
        {
          author: "Trump",
          comment: "Looks new, well maintaied",
          createdAt: "2022-08-06T07:49:32.669+00:00",
        },
        {
          author: "Pence",
          comment: "Lovely blocks, well sanitized",
          createdAt: "2022-08-06T07:49:32.669+00:00",
        },
      ],
    },
  ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Will",
    lastName: "Bill",
    email: "will@testmail.com",
    password: "password12345",
    aboutMe:
      "Passionate about sharing and proceedings from here goes to united kids",
    rentals: [
      {
        _id: products[0]._id,
        _id: products[3]._id,
        _id: products[5]._id,
      },
    ],
    wishlist: [
      {
        _id: products[1]._id,
        _id: products[4]._id,
        _id: products[6]._id,
      },
    ],
    isLender: true,
    isBorrower: true,
  });

  await User.create({
    firstName: "Joe",
    lastName: "Biden",
    email: "joe@testmail.com",
    password: "password12345",
    aboutMe:
      "Passionate about sharing and proceedings from here goes to united kids",
    rentals: [
      {
        _id: products[1]._id,
        _id: products[4]._id,
        _id: products[6]._id,
      },
    ],
    wishlist: [
      {
        _id: products[0]._id,
        _id: products[2]._id,
        _id: products[5]._id,
      },
    ],
    isLender: true,
    isBorrower: true,
  });

  console.log("users seeded");

  process.exit();
});
