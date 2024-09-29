# User

## Register

### request
+ method : POST
+ URL = localhost:3000/api/register
+ body = 
```json
{
    username: "",
    password: ""
}
```

### result
```json
{
    message: "User created",
    token: ""
}
```
or 
```json
{
    message: "Error explained"
}
```

## Login

### request
+ method : POST
+ URL = localhost:3000/api/login
+ body = 
```json
{
    username: "",
    password: ""
}
```

### result
```json
{
    token: ""
}
```
or 
```json
{
    message: "Error explained"
}
```

# File

## Save file

### request
+ method : POST
+ URL = localhost:3000/api/files/add
+ body = 
```json
{
    token: "",
    file_name: "",
    file_data_AES: "",
    file data_RC4: "",
    file_data_DES: ""
}
```

### result
```json
{
    message: "File saved"
}
```
or 
```json
{
    message: "Error explained"
}
```

## Delete file

### request
+ method : DELETE
+ URL = localhost:3000/api/files/delete
+ body = 
```json
{
    token: "",
    file_name: ""
}
```

### result
```json
{
    message: "File deleted"
}
```
or 
```json
{
    message: "Error explained"
}
```

## Get file or get all files
### request
+ method : GET
+ URL = localhost:3000/api/files
+ body = 
```json
{
    token: "", // Get all files 
}
```
or 
```json
{
    token: "", 
    file_name: "" // Get the file you want
}
```

### result
```json
{
    fileNames: ["","","",""]
}
```
or
```json
{
    file_data_AES: "",
    file data_RC4: "",
    file_data_DES: ""
}
```
or 
```json
{
    message: "Error explained"
}
```

# Text

## Save text

### request
+ method : POST
+ URL = localhost:3000/api/texts/add
+ body = 
```json
{
    token: "",
    text_name: "",
    text_data_AES: "",
    text data_RC4: "",
    text_data_DES: ""
}
```

### result
```json
{
    message: "Text saved"
}
```
or 
```json
{
    message: "Error explained"
}
```

## Delete text

### request
+ method : DELETE
+ URL = localhost:3000/api/texts/delete
+ body = 
```json
{
    token: "",
    text_name: ""
}
```

### result
```json
{
    message: "Text deleted"
}
```
or 
```json
{
    message: "Error explained"
}
```

## Get text or get all texts
### request
+ method : GET
+ URL = localhost:3000/api/texts
+ body = 
```json
{
    token: "", // Get all texts 
}
```
or 
```json
{
    token: "", 
    text_name: "" // Get the text you want
}
```

### result
```json
{
    textNames: ["","","",""]
}
```
or
```json
{
    text_data_AES: "",
    text data_RC4: "",
    text_data_DES: ""
}
```
or 
```json
{
    message: "Error explained"
}
```



