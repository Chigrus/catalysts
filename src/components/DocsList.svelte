<script>
    export let docsList;
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
</script>

<ul class="list">
    {#each docsList as item}
        <li 
            class="item"
            style="background-image: url({item.thumbnail});"
            on:click={() => dispatch('setLightBox', {isOpen: true, content: item.image})}>
        </li>
    {/each}
</ul>

<style>
.list{
    float: left;
    margin: 0;
    padding: 0;
    list-style-type: none;
    margin-top: 26px;
}

.item{
    float: left;
    width: 80px;
    height: 80px;
    background-color: #f6f6f6;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 90% 90%;
    margin: 4px 0;
    cursor: pointer;
}

.item:hover{
    -webkit-box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.1);
    box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.1);
}

.item:nth-child(3n+2){
   margin: 4px 8px;
}

@media only screen and (max-width: 767px){
    .item{
        margin: 4px;
    }

    .item:nth-child(3n+2){
        margin: 4px;
    }
}
</style>