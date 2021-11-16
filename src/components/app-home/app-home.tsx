import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  @State() image: string = '';
  @State() dogList: Array<any> = [];
  @State() Breed: string = "none yet!";
  @State() url: string;

  // Upon component load, fetch the list of breeds from the API
  componentWillLoad() {
    let list_url = 'https://dog.ceo/api/breeds/list/all';
    fetch(list_url)
        .then(res => {
            return res.json();
            })
        .then(data => {
            const breedsObject = data.message;
            const breedsArray = Object.keys(breedsObject);
            for (let i = 0; i < breedsArray.length; i++) {
                const option = document.createElement('option');
                option.value = breedsArray[i];
                option.innerText = breedsArray[i];
            this.dogList = breedsArray;
            }
        });
    }

  //If a breed is selected, api endpoint is changed to fetch images of that breed
  fetchBreed(ev) {
    this.Breed = ev.composedPath()[0].innerText.toLowerCase();
    this.url = "https://dog.ceo/api/breed/"+(ev.composedPath()[0].innerText).toLowerCase()+"/images/random";
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        this.image = data.message;
        });
      }

  //If random breed is selected, api endpoint is changed to fetch images of any breed
  fetchRandom(ev) {
    this.Breed = "random";
    this.url = 'https://dog.ceo/api/breeds/image/random ';
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        this.image = data.message;
        });
      }

  //Uses current api endpoint to fetch next image
  nextImage(ev) {
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        this.image = data.message;
        });
      }

  render() {
    return (
      <div class="app-home">
        <div class="Image Buttons">
          <dog-dropdown>
            <button slot="trigger">Breeds (Click to Toggle)</button>
            <div>{this.dogList.map(breed => <button onClick={ (ev) => this.fetchBreed(ev)}>{breed}</button> )}</div>
          </dog-dropdown>
          <button onClick={ (ev) => this.fetchRandom(ev)}>Random Breed</button>
        </div>
        <h1> Selected Breed: {this.Breed} </h1>
        <img src={`${this.image}`} onClick={ (ev) => this.nextImage(ev)}/>
        <p>
          Welcome to Dog Lovers Unite, your one-stop shop for uplifting dog images. If images of any breed of dog will do, select the random breed button. 
          If you want to see a specific breed of dog, toggle the breeds dropdown, select the breed from the dropdown menu, and then toggle it off by pressing 
          the breeds button again. To cycle through images of the selected breed, click on the image.
        </p>
      </div>
    );
  }
}
