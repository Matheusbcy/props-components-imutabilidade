export const loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponde = fetch ('https://jsonplaceholder.typicode.com/photos')


    const [posts, photos] = await Promise.all([postsResponse, photosResponde])

    const postsJson = await posts.json()
    const photosJson = await photos.json()
    const postAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    });
    return postAndPhotos
}