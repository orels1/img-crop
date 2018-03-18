# Image Cropper

> A cloud function to crop your lovely images

## Usage

Refer to the documentation for usage examples

## Development

You can launch your own clone of this function to stdlib or other serverless provider.

- Create the `env.json` file in the project root with your imgur client ID

```json
{
  "local": {
    "IMGUR_ID": "your imgur id"
  },
  "dev": {
    "IMGUR_ID": "your imgur id"
  },
  "release": {
    "IMGUR_ID": "your imgur id"
  }
}
```

[You can get the imgur client ID here](https://api.imgur.com/oauth2/addclient)

- Run `lib up dev` to deploy a dev version of the function
- Run `lib up release` to deploy a release version of the function (immutable)
