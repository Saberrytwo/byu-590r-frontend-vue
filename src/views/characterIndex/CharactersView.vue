  <!-- <template>
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
  </template> -->
  <template>
    <v-container>
      <v-btn @click="initializeCreate" color="primary" style="margin-bottom: 1rem;">Create Character</v-btn>
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
              :src="character.imageURLToShow"
              height="200px"
              contain
            ></v-img>
            <v-card-title>{{ character.name }}</v-card-title>
            <v-card-text>
              <p>Weight Class: {{ character.weightClass }}</p>
              <p>Origin Game: {{ character.originGame }}</p>
              <p>Release Pack: {{ character.releasePack }}</p>
              <p>{{ character.playstyleDescription }}</p>
              <v-select
                label="Moveset"
                :items="character.moves.map(m => m.name)">
              </v-select>
            </v-card-text>
            <div class="button-container"> <!-- Wrap buttons in a container -->
              <div>
                <v-btn class="position-icon-buttons edit-button" icon @click="initializeEdit(character)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn class="position-icon-buttons" icon @click="confirmDelete(character)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>

                <v-btn class="position-icon-buttons" @click="showTheme(index)">
                    {{ character.imageURLToShow === character.imageURL ? "Show Theme" : "Show Character" }}
                </v-btn>
            </div>
            </v-card>
          </v-col>
      </v-row>

      <v-dialog v-model="showCreateDialog" max-width="500px">
        <v-card>
          <v-card-title>Create Character</v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="createCharacter">
              <v-text-field :rules="nameRules" v-model="selectedCharacter.name" label="Name" required></v-text-field>
              <v-file-input
                  required
                  :rules="[imageTypeRule]"
                  label="Upload New Image"
                    @change="onFileUpload"
                  ></v-file-input>
              <v-text-field v-model="selectedCharacter.weightClass" label="Weight Class" required></v-text-field>
              <v-text-field v-model="selectedCharacter.originGame" label="Origin Game" required></v-text-field>
              <v-text-field v-model="selectedCharacter.releasePack" label="Release Pack" required></v-text-field>
              <v-textarea v-model="selectedCharacter.playstyleDescription" label="Playstyle Description" required></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" @click="createCharacter">Create</v-btn>
            <v-btn text @click="showCreateDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="showEditDialog" max-width="500px">
        <v-card>
          <v-card-title>Edit Character</v-card-title>
          <v-card-text>
            <v-form ref="editForm" @submit.prevent="createCharacter">
              <v-text-field v-model="selectedCharacter.name" label="Name" required></v-text-field>
              <v-file-input
                  label="Upload New Image"
                    @change="onFileUpload"
                  ></v-file-input>
              <v-text-field v-model="selectedCharacter.weightClass" label="Weight Class" required></v-text-field>
              <v-text-field v-model="selectedCharacter.originGame" label="Origin Game" required></v-text-field>
              <v-text-field v-model="selectedCharacter.releasePack" label="Release Pack" required></v-text-field>
              <v-textarea v-model="selectedCharacter.playstyleDescription" label="Playstyle Description" required></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" @click="updateCharacter">Save</v-btn>
            <v-btn text @click="showEditDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showDeleteDialog" max-width="500px">
        <v-card>
          <v-card-title>Are you sure you want to delete {{selectedCharacter.name}}?</v-card-title>
          <v-card-actions>
            <v-btn color="red darken-1" @click="deleteCharacter">Yes</v-btn>
            <v-btn text @click="showDeleteDialog = false">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>

<script src="./CharactersView.ts" />


<style src="./CharactersView.scss" />