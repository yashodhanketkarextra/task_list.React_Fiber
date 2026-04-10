.PHONY: dev clean build run run-fresh

dev:
	@go run main.go

clean:
	@rm -rf ./out/gtrend

build:
	@mkdir -p ./out
	@go build -o ./out/gtrend main.go

run: build
	@./out/gtrend

run-fresh: clean build
	@./out/gtrend

