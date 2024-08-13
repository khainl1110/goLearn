FROM golang:alpine

WORKDIR /app

COPY . . 

RUN go build -o server .

CMD ["/app/server"]