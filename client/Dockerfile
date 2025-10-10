# ---- Base build aşaması ----
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# environments
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Hata kontrolü (REACT_APP_API_URL boşsa hata ver)
RUN if [ -z "$REACT_APP_API_URL" ]; then \
      echo "ERROR: REACT_APP_API_URL not set"; \
      exit 1; \
    fi

# Eğer production moddaysa build al
RUN if [ "$NODE_ENV" = "production" ]; then \
        echo "Building React app for production..."; \
        npm run build; \
    else \
        echo "Skipping build (development mode)..."; \
        # ensure build folder exists so final stage COPY --from=build /app/build won't fail
        mkdir -p /app/build; \
    fi

# ---- Final aşaması ----
FROM node:18-alpine

WORKDIR /app
RUN npm install -g serve

# production ise build klasörünü kopyala
COPY --from=build /app/build ./build
COPY package*.json ./
RUN npm install

EXPOSE 3000

CMD if [ "$NODE_ENV" = "development" ]; then \
        echo "Starting React dev server..."; \
        npm start; \
    else \
        echo "Serving production build..."; \
        serve -s build -l 3000; \
    fi
