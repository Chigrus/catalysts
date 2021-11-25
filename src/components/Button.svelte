<script>
    export let title = '';
</script>

<button class="btn" on:click>{title}</button>

<style>
.btn{
    height: 34px;
    padding: 0 15px;
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 14px;
    color: #ffca00;
    border-radius: 5px;
    background-color: #515253;
}
</style>