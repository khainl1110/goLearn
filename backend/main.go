package main

import (
	"context"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client
var userCollection *mongo.Collection
var postCollection *mongo.Collection

func init() {
	var err error
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err = mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	userCollection = client.Database("testdb").Collection("users")
	postCollection = client.Database("testdb").Collection("posts")
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	r.POST("/users", createUser)
	r.GET("/users/:id", getUser)
	r.PUT("/users/:id", updateUser)
	r.DELETE("/users/:id", deleteUser)

	r.POST("/posts", createPost)
	r.GET("/posts/:id", getPost)
	r.PUT("/posts/:id", updatePost)
	r.DELETE("/posts/:id", deletePost)

	r.POST("/users/logIn", LogIn)

	r.Run(":8080")
}
