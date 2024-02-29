<template>
  <div class="outer-layer">
          <v-container fluid fill-height>
           <v-layout align-center justify-center class="login-form">
              <v-flex xs12 sm8 md4>
                 <v-card>
                    <v-toolbar dark color="primary">
                       <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                    <v-form ref="form" @submit.prevent="submitLogin()" v-model="valid">
                           <v-text-field
                             v-model="username"
                             :rules="usernameRules"
                             name="username"
                             label="Username"
                             type="text"
                             placeholder="username"
                             required
                          ></v-text-field>
                          
                           <v-text-field
                             v-model="password"
                             :rules="passwordRules"
                             name="password"
                             label="Password"
                             type="password"
                             placeholder="password"
                             required
                          ></v-text-field>
                          <v-container class="button-group">
                            <v-btn :disabled="!valid" type="submit" :loading="loading" color="primary" value="log in">Login</v-btn>
                            <v-btn @click="dialog = true" color="primary" value="forgot password">Forgot Password</v-btn>
                            <v-btn @click="registerDialog = true" color="primary" value="forgot password">Register</v-btn>
                          </v-container>
                          <v-dialog
                            v-model="dialog"
                            class="forgot-dialog"
                          >
                            <v-card class="dialog-buttons">
                              <v-text-field label="Password Reset Email" />
                              <v-container class="button-group">
                                <v-card-actions>
                                  <v-btn color="primary" block @click="dialog = false">Close</v-btn>
                                </v-card-actions>
                                <v-card-actions>
                                  <v-btn color="primary" block @click="dialog = false">Submit</v-btn>
                                </v-card-actions>
                              </v-container>

                            </v-card>
                          </v-dialog>
                     </v-form>
                     <v-dialog
                            v-model="registerDialog"
                            class="register-dialog"
                          >
                          <v-card class="dialog-buttons">
                            <v-toolbar dark color="primary">
                       <v-toolbar-title>Registration form</v-toolbar-title>
                    </v-toolbar>
                     <v-form ref="registrationForm" @submit.prevent="submitRegistration()" v-model="validRegistration">
                      <v-text-field label="First Name" 
                             v-model="registrationFirstName"
                             :rules="registrationNameRules"
                             name="firstname"
                             type="text"
                             placeholder="first name"
                             required
                          ></v-text-field>
                      <v-text-field label="Last Name" 
                             v-model="registrationLastName"
                             :rules="registrationNameRules"
                             name="lastname"
                             type="text"
                             placeholder="last name"
                             required
                          ></v-text-field>
                          <v-text-field
                             v-model="registrationUsername"
                             :rules="registrationUsernameRules"
                             name="registrationUsername"
                             label="Username/Email"
                             type="text"
                             placeholder="username/email"
                             required
                          ></v-text-field>
                              <v-text-field
                             v-model="registrationPassword"
                             :rules="registrationPasswordRules"
                             name="password"
                             label="Password"
                             type="password"
                             placeholder="password"
                             required
                          ></v-text-field>
                          <v-text-field
                             v-model="confirmPassword"
                              :rules="[passwordMatchRule]"
                             name="confirmpassword"
                             label="Confirm Password"
                             type="password"
                             placeholder="re-type your password"
                             required
                          ></v-text-field>
                            <v-container class="button-group">
                              <v-card-actions>
                                <v-btn color="primary" block @click="registerDialog = false">Close</v-btn>
                              </v-card-actions>
                              <v-card-actions>
                                <v-btn type="submit" :disabled="!validRegistration" :loading="loading" color="primary" value="Submit Registration">Submit Registration</v-btn>
                              </v-card-actions>
                            </v-container>
                        
                     </v-form>
                    </v-card>
                    </v-dialog>
                     <v-alert v-if="errorMsg" type="error">{{ errorMsg }}</v-alert>
                     <v-alert
                        v-model="showAlert"
                        :type="alertStyle"
                        dismissible
                        transition="scale-transition"
                      >
                        {{ alertMessage }}
                      </v-alert>
                    </v-card-text>
                 </v-card>
              </v-flex>
           </v-layout>
        </v-container>
  </div>
</template>



<script src="./LoginView.ts" />


<style src="./LoginView.scss" />
