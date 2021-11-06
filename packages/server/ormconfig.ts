module.exports = {
   type: 'postgres',
   url: 'postgres://root:root@localhost:5432/schema-overload',
   logging: true,
   entities: ['src/entity/**/*.ts', 'src/entity/**/*.js'],
   migrations: ['src/migration/**/*.ts', 'src/migration/**/*.js'],
   subscribers: ['src/subscriber/**/*.ts', 'src/subscriber/**/*.js'],
   cli: {
     entitiesDir: 'src/entity',
     migrationsDir: 'src/migration',
     subscribersDir: 'src/subscriber',
   },
 };
 