
import { cache } from 'react';
import { unstable_cache as nextCache } from 'next/cache'
import sql from 'better-sqlite3';

const db = new sql('messages.db');

function initDb() {
    db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
    db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

// Manually Cache, Request Memoization for request in the same single request cycle
export const getMessages = nextCache(
    cache(function getMessages() { // nextCache returns a promise
        console.log('Fetching messages from db');
        return db.prepare('SELECT * FROM messages').all();
    }), 
    ['messages'], // cache keys using internally for the method
    {
        tags: ['msg'] // tags to revalidate, like the config on fetch
    }
); 

// cache from react its for deduplication request, this is for the same requests in the same request cycle, for example
// getMessages in messages/page.js and messages/layout.js, both are called in the same request cycle and returns the same
// data.

// nextCache its for make cacheable the data returned by the function