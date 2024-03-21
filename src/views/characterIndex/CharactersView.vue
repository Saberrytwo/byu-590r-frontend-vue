  <template>
    <v-container>
      <v-row>
        <v-col
          v-for="(character, index) in characters"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card elevation="2">
            <v-img
              :src="character.imageURL"
              height="200px"
              contain
            ></v-img>
            <v-card-title>{{ character.name }}</v-card-title>
            <v-card-text>
              <p>Weight Class: {{ character.weightClass }}</p>
              <p>Origin Game: {{ character.originGame }}</p>
              <p>Release Pack: {{ character.releasePack }}</p>
              <p>{{ character.playstyleDescription }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>


<script src="./CharactersView.ts" />


<style src="./CharactersView.scss" />