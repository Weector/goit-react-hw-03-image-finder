import { Component } from 'react';
import { toast } from 'react-toastify';

import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';

import css from './ImageGallery.module.css';
import Fetch from 'components/fetch/fetch';

class ImageGallery extends Component {
  state = {
    pictures: [],
    counter: 1,
    loading: false,
  };

  onHandleButtonClick = () => {
    this.setState({ loading: true });
    Fetch(this.props.query, this.state.counter + 1).then(resp =>
      this.setState({
        pictures: [...this.state.pictures, ...resp],
        counter: this.state.counter + 1,
        loading: false,
      })
    );
  };

  componentDidUpdate(prevProps, _) {
    if (prevProps !== this.props) {
      this.setState({ loading: true });
      Fetch(this.props.query, 1)
        .then(resp =>
          this.setState({
            pictures: resp,
            counter: 1,
            loading: false,
          })
        )

        .catch(
          error => toast.error({ error }) && this.setState({ loading: false })
        );
    }
  }
  render() {
    const { pictures, loading } = this.state;
    const { toggleModal } = this.props;

    return (
      <>
        {loading && <Loader className={css.loader} />}
        <ul className={css.list}>
          <ImageGalleryItem pictures={pictures} toggleModal={toggleModal} />
        </ul>
        {!!pictures?.length && pictures?.length > 11 && (
          <Button onClick={this.onHandleButtonClick}>Load More</Button>
        )}
      </>
    );
  }
}

export default ImageGallery;
