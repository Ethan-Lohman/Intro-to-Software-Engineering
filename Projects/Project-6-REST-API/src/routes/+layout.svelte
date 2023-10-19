
<div>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
    </ul>
</div>
<slot/>
<div>Footer</div>

<style>
    ul {
        display:flex;
    }

    li {
        margin: 5px;
        list-style: none;
    }
</style>