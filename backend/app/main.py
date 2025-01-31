from fastapi import FastAPI
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
import yaml

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello-yaml", response_class=Response, responses={200: {"content": {"application/x-yaml": {}}}})
async def hello_yaml():
    data = {"message": "Hello, World!"}
    yaml_data = yaml.dump(data)
    return Response(content=yaml_data, media_type="application/x-yaml")

