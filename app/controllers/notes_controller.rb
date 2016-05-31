class NotesController < ApplicationController
  before_action :find_note, only: [:show, :edit, :update, :destroy]
  before_action :authorize_ownership, only: [:show, :edit, :update, :destroy]

  #uses ActiveModel Serializer to implicitly serialize note (render json: @note), in serializers/note_serializer.rb
  def index
    @notes = current_user.notes.order('created_at DESC')
    respond_to do |format|
     #format.html { render :index }
     format.json { render json: @notes }
   end
  end

  def show
    respond_to do |format|
     format.html { render :show }
     format.json { render json: @note }
   end
  end

  def create
    @note = current_user.notes.create(note_params)
    render json: @note
  end

  def edit
      @user_tags = current_user.tags.order("name ASC")
  end

  def update
    @note.update(note_params)
    respond_to do |format|
     format.html { redirect_to(root_path) }
     format.json { render json: @note }
   end
  end

  def destroy
    @note.destroy
    #render nothing: true #don't render or redirect since this will be called via ajax

    #respond_to do |format|
      #format.html { redirect_to(root_path) }
      #format.json { render nothing: true }
    #end

    if request.xhr? #checks if ajax request - checks header
      render nothing: true #don't redirect or render anything
    else
      redirect_to(root_path) #else if initiating from note show page, redirect to home
    end
  end

  #--------------------
  private

  def find_note
    @note = Note.find(params[:id])
  end

  def authorize_ownership
    if @note.user != current_user
      redirect_to root_path, alert: 'You do not have required permissions.'
    end
  end

  def note_params #strong params
    params.require(:note).permit(:title, :content, tag_ids: [])
  end
end
