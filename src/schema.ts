import { makeExecutableSchema } from '@graphql-tools/schema'

const typeDefinitions = `
    type Query {
        products: [Product]!
        product(id: Int!): Product
    }
    type Mutation {
        createProduct(product: InputProduct!): Product
        deleteProduct(id: Int!): Product
        updateProduct(id: Int!, product: InputProduct!): Product
    }
    type Product {
        id: Int!
        name: String!
        description: String!
        image: String!
        price: Int!
        stock: Int!
    }
    input InputProduct {
        name: String!
        description: String!
        image: String!
        price: Int!
        stock: Int!
    }
    input UpdateProduct {
        id: Int!
        name: String!
        description: String!
        image: String!
        price: Int!
        stock: Int!
    }
`;

type Product = {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number
}

type InputProduct = {
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number
}

type UpdateProduct = {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number
}

const products: Product[] = [
    {
        id: 1,
        name: "Sepatu Pria Hipzo Casual",
        description: "Hipzo Original Produk Kebanggaan anak bangsa dengan Kualitas International Model dan design Elegan dan Kekinian. Bahan Pilihan, Kualitas terjaga .",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIMRGvW6eNTUaM44N9pbltcLmUdrz-tu1EqmAN5xtXtPpAOxH6",
        price: 100000,
        stock: 5
      },
      {
        id: 2,
        name: "Sandal Pria Hipzo CT 08",
        description: "Sandal kualitas premium design yg elegant cocok untuk laki laki atau perempuan milenial saat ini.",
        image:
          "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSmHWrEnWwIZ0k7Q8ry3Ye-aEHILZB45ZKYxbtPMdmTCzVdILaO",
        price: 45000,
        stock: 9
      },
]

const resolvers = {
    Query: {
        products: () => products,
        product: (_parent: unknown, args: {id: number}) => products.find((product) => product.id === args.id)
    },
    
    Mutation: {
        createProduct: (_parent: unknown, args: { product: InputProduct}) =>{
            const lastId = products[products.length - 1].id;
            
            const newProduct: Product = {
                id: lastId + 1,
                name: args.product.name,
                description: args.product.description,
                image: args.product.image,
                price: args.product.price,
                stock: args.product.stock
            };
            products.push(newProduct);

            return newProduct
        },
        
        deleteProduct: (_parent: unknown, args: { id: number }) => {
            const productIndex = products.findIndex((product) => product.id === args.id);
            if (productIndex === -1){
                throw new Error("Product Not Found!")
            }
            const product = products[productIndex];
            products.splice(productIndex, 1);
            return product            
        },
        
        updateProduct: (_parent: unknown, args: {id: number, product: InputProduct} ): Product => {
            const productIndex = products.findIndex((product: Product) => product.id === args.id)
            
            if(productIndex === -1){
                throw new Error('Product Not Found!')
            }

            const updatedProduct = {
                id: args.id,
                name: args.product.name,
                description: args.product.description,
                image: args.product.image,
                price: args.product.price,
                stock: args.product.stock
            }

            products[productIndex] = updatedProduct;
            return updatedProduct;
        }   
    },   
};

export const schema = makeExecutableSchema ({
    resolvers: [resolvers],
    typeDefs: [typeDefinitions]
})