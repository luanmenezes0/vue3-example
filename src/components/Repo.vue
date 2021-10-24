<script setup lang="ts">
import { Repository } from '../models/models';

const { repository } = defineProps<{ repository: Repository }>()

</script>

<template>
	<article>
		<h2>{{ repository.name }}</h2>
		<div>
			<span>⚠️ {{ repository.open_issues }}</span>
			<span>⭐ {{ repository.stargazers_count }}</span>
		</div>
	</article>
</template>


<style>
h2,
p {
	margin: 0;
}

article {
	display: grid;
	gap: 0.25rem;
	border: 1px solid salmon;
	padding: 0.5rem;
	border-radius: 0.5rem;
}
</style>