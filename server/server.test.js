// const request = require('supertest');
// const app = require('./server'); // Import your server application

// describe('Server Endpoints', () => {
//   it('should respond with a 200 status for the home route', async () => {
//     const response = await request(app).get('/');
//     expect(response.statusCode).toBe(200);
//     expect(response.text).toBe('Hello, Notes App!');
//   });

//   it('should return an empty array for the notes endpoint initially', async () => {
//     const response = await request(app).get('/api/notes');
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual([]);
//   });

//   it('should allow adding a new note', async () => {
//     const newNote = { title: 'Test Note', content: 'This is a test note.' };
//     const response = await request(app)
//       .post('/api/notes')
//       .send(newNote);

//     expect(response.statusCode).toBe(201);
//     expect(response.body).toEqual(newNote);

//     const getResponse = await request(app).get('/api/notes');
//     expect(getResponse.body).toContainEqual(newNote);
//   });

//   it('should update an existing note', async () => {
//     const updatedNote = { title: 'Updated Title', content: 'Updated content.' };
//     await request(app).post('/api/notes').send(updatedNote); // Add a note first

//     const updateResponse = await request(app)
//       .put('/api/notes/0')
//       .send(updatedNote);

//     expect(updateResponse.statusCode).toBe(200);
//     expect(updateResponse.body).toEqual(updatedNote);
//   });

//   it('should delete a note', async () => {
//     await request(app).post('/api/notes').send({ title: 'To be deleted', content: 'Delete this note.' });

//     const deleteResponse = await request(app).delete('/api/notes/0');
//     expect(deleteResponse.statusCode).toBe(204);

//     const getResponse = await request(app).get('/api/notes');
//     expect(getResponse.body).not.toContainEqual({ title: 'To be deleted', content: 'Delete this note.' });
//   });

//   // Add more tests for other scenarios as needed
// });


jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue(),
}));

const request = require('supertest');
const app = require('./server');

describe('Notes API', () => {
  it('GET / should return hello message', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('Hello, Notes App!');
  });

  it('POST /api/notes should create note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: 'Test Note' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Note');
  });

  it('GET /api/notes should return notes', async () => {
    const res = await request(app).get('/api/notes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});