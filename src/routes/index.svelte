<script context="module">
	export function preload() {
		const req1 = this.fetch('/content.json').then(r => r.json())
		const req2 = this.fetch('/menu.json').then(r => r.json())
		const req3 = this.fetch('/general.json').then(r => r.json())
		const req4 = this.fetch('/metalls.json').then(r => r.json())
		const req5 = this.fetch('/token.json').then(r => r.json())
		return 	Promise.all([
			req1, req2, req3, req4, req5
		])
		.then(([content, menu, general, metalls, user]) => {
			return { content, menu, general, metalls, user };
		});
	}
</script>

<script>
import PopupEditContent from '../components/PopupEditContent.svelte';	
import { isAdmin } from '../store.js';
import { isEditor } from '../store.js';

export let content;
export let menu;
export let general;
export let metalls;
export let user;

export let logo = {	name: 'СПЛАВ-ЛД', subname: 'КАТАЛИЗАТОРЫ' };
export let qotes = [
	{ id: 1, title: 'ПАЛЛАДИЙ', value: metalls.PD },
	{ id: 2, title: 'ПЛАТИНА', value: metalls.PT },
	{ id: 3, title: 'РОДИЙ', value: metalls.RH }
];

isAdmin.set(user.isAdmin);
isEditor.set(user.isEditor);

let calcCeramics = {
	isShow: false,
	title: '',
	percent_factory: '',
	percent_profit: '',
	producer: '',
	producerWeight: 0,
	humidity: 1.8,
	dryWeight: 0,
	qotes: qotes,
	contentsPD: 0,
	contentsPT: 0,
	contentsRH: 0,
	contentsPDgr: 0,
	contentsPTgr: 0,
	contentsRHgr: 0,
	totalOneKG: 0,
	totalPrice: 0,
	manager: 'Шило Виталий',
}

let isMobileMenu = false;

//import Rotate from '../components/Rotate.svelte';
import Logo from '../components/Logo.svelte';
import Nav from '../components/Nav.svelte';
import SubHeader from '../components/SubHeader.svelte';
import AboutUs from '../components/AboutUs.svelte';
import Calc from '../components/Calc.svelte';
import CalcCeramics from '../components/CalcCeramics.svelte';
import CalcInfo from '../components/CalcInfo.svelte';
//import CarService from '../components/CarService.svelte';
import Reviews from '../components/Reviews.svelte';
import Catalog from '../components/Catalog.svelte';
import Quotes from '../components/Quotes.svelte';
import TopFooter from '../components/TopFooter.svelte';
import Footer from '../components/Footer.svelte';

import { onMount } from 'svelte';

onMount(async () => {

	if (window.matchMedia("(min-width: 640px)").matches) {
		var options = {
			root: document.querySelector('#scrollArea'),
			rootMargin: '0px',
			threshold: 1.0
		}

		var callback = function(entries, observer) {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					let ind = menu.findIndex(item => item.url === entry.target.id);
					if(ind >= 0){
						menu.forEach(function(item, i) { 
							item.active = false; 
						});
						menu[ind].active = true;
					}				
				}
			});
		};

		var observer = new IntersectionObserver(callback, options);

		const targets = document.querySelectorAll('.wrap')
		targets.forEach((target) => {
			observer.observe(target);
		})
	}
});

function onCalcCeramic(e){
	//console.log(e.detail);
	calcCeramics.isShow = true;
	calcCeramics.title = e.detail.title;
	calcCeramics.percent_factory = e.detail.percent_factory;
	calcCeramics.percent_profit = e.detail.percent_profit;
}

function openMobMenu(){
	isMobileMenu = true;
}

function closeMobMenu(){
	isMobileMenu = false;
}

$: subheader = content.filter(dataline => dataline.category === 'header');
$: about = content.filter(dataline => dataline.category === 'about');
$: aboutList = content.filter(dataline => dataline.category === 'aboutList');
$: calcInfo = content.filter(dataline => dataline.category === 'calcinfo');
//$: carService = content.filter(dataline => dataline.category === 'carService');
//$: carServiceList = content.filter(dataline => dataline.category === 'carServiceList');
$: reviews = content.filter(dataline => dataline.category === 'reviews');
$: reviewsList = content.filter(dataline => dataline.category === 'reviewsList');
$: catalog = content.filter(dataline => dataline.category === 'catalog');
$: catalogList = content.filter(dataline => dataline.category === 'catalogList');
$: footerabout = content.filter(dataline => dataline.category === 'footerabout');

let masspopup = {
	popup: false,
	fields: [],
	data: []
};

let id;
</script>

<svelte:head>
	<title>Прием катализаторов дорого, выезд - бесплатно</title>
	<meta name="description" content="Прием катализаторов дорого, выезд - бесплатн" />
</svelte:head>

{#if $isEditor}
	<div class="edit_general">11111</div>
{/if}

{#if masspopup.popup}
	<PopupEditContent 
		bind:content={masspopup} 
		on:updateData={(event) => { 
			id = event.detail;
			content[content.forEach(function(post, i){if(post.id === id.id){return i}})] = masspopup.data;
	 	}}
	/>
{/if}

<CalcCeramics bind:calcCeramics={calcCeramics} />

<div class="wrap wrap_header">
	<div class="work">
		<div class="header">
			<Logo {logo} />
			<nav class="{isMobileMenu ? 'navigation open' : 'navigation'}">
				<Nav bind:menu bind:isMobileMenu />
				<span class="mobMenuClose" on:click="{closeMobMenu}"></span>
			</nav>
			<div class="mobMenuBtn" on:click="{openMobMenu}"></div>
		</div>
	</div>
</div>
<div id="home" class="wrap">
	<div class="work">
		<SubHeader {subheader} on:getData={(event) => { masspopup = event.detail; }} />
	</div>
</div>
<div id="calc" class="wrap wrap_calc">
	<div class="work">
		<Calc />
	</div>
</div>
<div class="wrap wrap_calc">
	<div class="work">
		<CalcInfo {calcInfo} {general} on:onCalcCeramic={onCalcCeramic} {subheader} on:getData={(event) => { masspopup = event.detail; }} />
	</div>
</div>
<!-- <div class="wrap">
	<div class="work">
		<Rotate />
	</div>
</div> -->
<div id="about" class="wrap wrap_about">
	<div class="work">
		<AboutUs {about} {aboutList} {general} />
	</div>
</div>
<!-- <div id="catalog" class="wrap">
	<div class="work">
		<CarService {carService} {carServiceList} />
	</div>
</div> -->
<div id="blog" class="wrap">
	<div class="work">
		<Reviews {reviews} {reviewsList} />
	</div>
</div>
<div class="wrap wrap_catalog">
	<div class="work">
		<Catalog {catalog} {catalogList} />
	</div>
</div>
<div class="wrap">
	<div class="work">
		<Quotes title={'БИРЖА<br> МЕТАЛЛОВ<br> LME'} {qotes} />
	</div>
</div>
<div id="contacts" class="wrap">
	<div class="work">
		<TopFooter {logo} {footerabout} bind:menu {general} />
	</div>
</div>
<div class="wrap">
	<div class="work">
		<Footer />
		<!-- <pre>{JSON.stringify(metalls, null, 2)}</pre> -->
	</div>
</div>

<style>
.wrap_header{
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	background-color: #fff;
	-webkit-box-shadow: 0px 1px 4px 0px rgba(50, 50, 50, 0.1);
	-moz-box-shadow: 0px 1px 4px 0px rgba(50, 50, 50, 0.1);
	box-shadow: 0px 1px 4px 0px rgba(50, 50, 50, 0.1);
}
.header{
	float: left;
	width: 100%;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.wrap_about{
	background-color: #f6f6f6;
}
.wrap_catalog{
	background-color: #f6f6f6;
}

.mobMenuBtn{
	display: none;
}

@media only screen and (max-width: 639px){
    .navigation{
        position: fixed;
		z-index: 99999999999;
		top: 0;
		left: -100%;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgba(255,255,255,1);
		transition-duration: 0.5s;
		transition-property: left;    
	}
    .navigation.open{
		left: 0;
		transition-duration: 0.5s;
		transition-property: left;
    }

	.mobMenuBtn{
		display: block;
		width: 40px;
		height: 40px;
		background-image: url(/svg/menu.svg);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 32px 32px;
	}

	.mobMenuClose{
		position: absolute;
		top: 15px;
		right: 20px;
		display: block;
		width: 40px;
		height: 40px;
		background-image: url(/svg/close.svg);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 25px 25px;
	}
}

@media only screen and (max-width: 479px){
	.header{
		height: 60px;
	}
}
</style>