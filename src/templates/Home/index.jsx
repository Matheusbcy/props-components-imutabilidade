import './styles.css';

import { Component } from 'react';

import { loadPosts } from '../../components/utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button/index';
import { TextInput } from '../../components/TextInput';

// CRIANDO COMPONENTS
class Home extends Component {
  state = {
      posts: [],
      allPosts: [],
      // USANDOS EM PAGINAÇÃO
      page: 0,
      postsPerPage: 10,
      // INPUT DE TEXTO
      searchValue: '',
    };
    // USANDO FETCH
    async componentDidMount() {
      this.loadPosts();
    }
    loadPosts = async () => {
      const { page, postsPerPage } = this.state;
      const postAndPhotos = await loadPosts()
      this.setState({
              posts: postAndPhotos.slice(page, postsPerPage),
              allPosts: postAndPhotos})
    }
     // ----------------------------------- // 
     // PAGINAÇÃO
    loadMorePosts = () => {
      const {
        page,
        postsPerPage,
        allPosts,
        posts,
      } = this.state;
      const nextPage = page + postsPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
      posts.push(...nextPosts)
      this.setState({ posts, page: nextPage})
    }
    // ------------------------------------- //

    // INPUT DE TEXTO

    handleChange = (e) => {
      const {value} = e.target;
      this.setState({ searchValue: value});
    }

 render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ? 
    
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    })
    : 
    posts;

    return (
    <section className='container'> 
    <div className='search-container'>
    {!!searchValue && (
      <h1>Seach value: {searchValue}</h1>
    )}
      <TextInput 
      searchValue={searchValue}
      handleChange={this.handleChange}/>
      </div>
      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}
      {filteredPosts.length === 0 && (
        <p>Não existem posts</p>
      )}
    <div className='button-container'>
      {!searchValue && (
        <Button text={'Load more posts'}
        loadMorePosts={this.loadMorePosts}
        disabled={noMorePosts}
        />
      )}

    </div>
    </section> 
  );
 }
}

export default Home;
