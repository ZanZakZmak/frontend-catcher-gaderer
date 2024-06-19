import axios from "axios";

let Service = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
});

let test = "OK";
let objekt = {
  kljuc1: "prvi",
  kljuc2: [1, 2, 3],
  kljuc3: {
    k: "hhhhhhhh",
  },
};

// naš objekt za sve pozive koji se dotiču `Post`ova
let Posts = {
  async getAll(searchTerm) {
    //return Service.get(`/posts?title=${searchTerm}`);
    let response = await Service.get(`/tesiranjeMongoTAN`);
    let data = response.data;
    console.log("Podaci s backenda", data);
    /*data = data.map((doc) => {
      return {
        id: doc.id,
        url: doc.source,
        email: doc.createdBy,
        title: doc.title,
        posted_at: Number(doc.postedAt),
      };
    });*/
    return data;

    //return await Service.get(`/data`);
  },
  async add(post) {
    let x = {
      name: "Jane Doe",
      email: "jane@abc.com",
      age: 26,
      hobbies: ["databases", "painting", "soccer"],
    };
    let response = await Service.post("/tesiranjeMongoTAN", post);

    return response;
  },
  async delete(postId) {
    let response = await Service.delete(`/tesiranjeMongoTAN/${postId}`);

    return response;
  },
};

export { test, objekt, Service, Posts }; // exportamo Service za ručne pozive ili Posts za metode.
