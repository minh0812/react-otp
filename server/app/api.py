import json
import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models.User import User
import starlette.responses as _responses

app = FastAPI()

# chỉ các địa chỉ sau có thể truy cập api. Nếu muốn cho tất cả các host thì điền dấu *

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
# lấy địa chỉ của file data
folder = Path(__file__).parent
my_path_file = os.path.join(folder, "user.json")


# lấy data từ file json
def read_todo_data():
    with open(my_path_file, 'r') as the_file:
        data = the_file.read()

    return json.loads(data)


@app.get("/", tags=["root"])
async def root():
    return _responses.RedirectResponse("/redoc")


@app.get("/user/{id}", tags=["user"])
async def get_user(id: str) -> dict:
    data = read_todo_data()
    for user in data:
        if user["id"] == id:
            return {
                "data": user
            }

    return {
        "data": "not found"
    }


@app.post("/user", tags=["user"])
async def add_user(user: User) -> dict:
    data = read_todo_data()
    data.insert(0, {
        'id': user.id,
        'name': user.name,
        'phone': user.phone
    })
    # save data
    with open(my_path_file, 'w') as the_file:
        json.dump(data, the_file, indent=4)
    return {
        "data": user
    }
