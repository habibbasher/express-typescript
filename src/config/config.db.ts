const config = {
    'ENV': 'development',
    'PORT': {
        'DEV': '3000',
        'PROD': '3000'
    },
    'MONGO_URI': {
        'DEVELOPMENT': 'mongodb://localhost:27017/example-db-development',
        'PRODUCTION': 'mongodb://localhost:27017/example-db-production',
        'TEST': 'mongodb://localhost:27017/example-db-test'
    },
    'REDIS_SERVER': {
        'DEVELOPMENT': 'localhost',
        'PRODUCTION': 'localhost'
    },
    'SESSION_SECRET': '7987FC4FE9837820K6J7U7D902FED1B8E93D'
};

export default config;