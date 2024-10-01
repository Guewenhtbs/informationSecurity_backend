# User

## Register

### request
+ method : POST
+ URL = localhost:3000/api/register
+ body = 
```json
{
    "username": "",
    "password": ""
}
```

### result
```json
{
    "message": "User created",
    "token": ""
}
```
or 
```json
{
    "message": "Error explained"
}
```

## Login

### request
+ method : POST
+ URL = localhost:3000/api/login
+ body = 
```json
{
    "username": "",
    "password": ""
}
```

### result
```json
{
    "token": ""
}
```
or 
```json
{
    "message": "Error explained"
}
```

# File

## Save file

### request
+ method : POST
+ URL = localhost:3000/api/files/add
+ header: 
```json
"authorization" = "Bearer ${token}"
```
+ body = 
```json
{
    "file_name": "",
    "file_data_AES": "",
    "file_data_RC4": "",
    "file_data_DES": ""
}
```

### result
```json
{
    "message": "File saved"
}
```
or 
```json
{
    "message": "Error explained"
}
```

## Delete file

### request
+ method : DELETE
+ URL = localhost:3000/api/files/delete
+ header: 
```json
"authorization" = "Bearer ${token}"
```
+ body = 
```json
{
    "file_name": ""
}
```

### result
```json
{
    "message": "File deleted"
}
```
or 
```json
{
    "message": "Error explained"
}
```

## Get file 
### request
+ method : GET
+ URL = localhost:3000/api/files/:file_name
+ header: 
```json
"authorization" = "Bearer ${token}"
```
+ body = 
```json
{ 
    "file_name": "" 
}
```

### result
```json
{
    "file_data_AES": "",
    "file_data_RC4": "",
    "file_data_DES": ""
}
```
or 
```json
{
   "message": "Error explained"
}
```

## Get all files 
### request
+ method : GET
+ URL = localhost:3000/api/files
+ header: 
```json
"authorization" = "Bearer ${token}"
```

### result
```json
{
    "fileNames": ["","","",""]
}
```
or 
```json
{
   "message": "Error explained"
}
```

# Text

## Save Text

### request
+ method : POST
+ URL = localhost:3000/api/texts/add
+ header: 
```json
"authorization" = "Bearer ${token}"
```
+ body = 
```json
{
    "text_name": "",
    "text_data_AES": "",
    "text_data_RC4": "",
    "text_data_DES": ""
}
```

### result
```json
{
    "message": "text saved"
}
```
or 
```json
{
    "message": "Error explained"
}
```

## Delete text

### request
+ method : DELETE
+ URL = localhost:3000/api/texts/delete
+ header: 
```json
"authorization" = "Bearer ${token}"
```
+ body = 
```json
{
    "text_name": ""
}
```

### result
```json
{
    "message": "text deleted"
}
```
or 
```json
{
    "message": "Error explained"
}
```

## Get text 
### request
+ method : GET
+ URL = localhost:3000/api/texts/:text_name
+ header: 
```json
"authorization" = "Bearer ${token}"
```
+ body = 
```json
{ 
    "text_name": "" 
}
```

### result
```json
{
    "text_data_AES": "",
    "text_data_RC4": "",
    "text_data_DES": ""
}
```
or 
```json
{
   "message": "Error explained"
}
```

## Get all texts 
### request
+ method : GET
+ URL = localhost:3000/api/texts
+ header: 
```json
"authorization" = "Bearer ${token}"
```

### result
```json
{
    "textNames": ["","","",""]
}
```
or 
```json
{
   "message": "Error explained"
}
```

