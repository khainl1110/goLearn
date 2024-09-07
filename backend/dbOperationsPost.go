package main

import (
	"context"
	"example/hello/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func createPost(c *gin.Context) {
	var post models.Post
	// why need & here
	if err := c.BindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	post.ID = primitive.NewObjectID()
	_, err := postCollection.InsertOne(context.TODO(), post)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, post)
}

func getPost(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}
	var post models.Post
	err = postCollection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&post)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}
	c.JSON(http.StatusOK, post)
}

func updatePost(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var post models.User
	if err := c.BindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	filter := bson.M{"_id": objID}
	update := bson.M{"$set": post}

	_, err = postCollection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, post)
}

func deletePost(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	_, err = postCollection.DeleteOne(context.TODO(), bson.M{"_id": objID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusNoContent, nil)
}

func findPostsByUser(c *gin.Context) {
	println("haha")
	userId := c.Param("userId")
	print(userId)

	// userId1, err := primitive.ObjectIDFromHex(userId)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// filter := bson.M{"userId": userId1}
	filterTest := bson.M{"content": "dfsd"}
	// filter := bson.M{}
	// println(userId)

	cur, err := postCollection.Find(context.Background(), filterTest)

	print(cur.RemainingBatchLength())
	print(err)
	println("haha2")

	if err != nil {
		log.Fatal(err)
	}

	var posts []models.Post
	if err = cur.All(context.TODO(), &posts); err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, posts)
}

func findAllPosts(c *gin.Context) {

	filter := bson.D{}

	cur, err := postCollection.Find(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
	}

	var posts []models.Post
	if err = cur.All(context.TODO(), &posts); err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, posts)

}
