package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Post struct {
	ID      primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	UserId  primitive.ObjectID `json:"userId,omitempty" bson:"omitempty"`
	Content string             `json:"content"`
}
