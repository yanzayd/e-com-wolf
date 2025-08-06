export default async function handler(req, res) {
    const { term } = req.query;
    
    try {
        // Here you would typically query your database
        // For now, we'll return a mock response
        const results = items.filter(item =>
            item.title.toLowerCase().includes(term.toLowerCase())
        );
        
        res.status(200).json(results);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Error performing search' });
    }
}