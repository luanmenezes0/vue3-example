<script setup lang="ts">
import { Repository } from "../models/models";

const { repository } = defineProps<{ repository: Repository }>();
</script>

<template>
	<article>
		<h2>{{ repository.name }}</h2>
		<p>{{ repository.description }}</p>
		<div class="info">
			<span>⚠️ {{ repository.open_issues }}</span>
			<span>⭐ {{ repository.stargazers_count }}</span>
		</div>
	</article>
</template>

<style scoped>
h2,
p {
	margin: 0;
}

.info {
	display: flex;
	gap: 1rem;
}

article {
	display: grid;
	gap: 0.25rem;
	border: 1px solid salmon;
	padding: 0.75rem;
	border-radius: 0.5rem;
}
</style>
