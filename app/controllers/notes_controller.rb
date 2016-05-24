class NotesController < ApplicationController
  before_action :find_note, only: [:show, :update, :destroy]

  #uses ActiveModel Serializer to implicitly serialize note (render json: @note), in serializers/note_serializer.rb
  def index
    @notes = current_user.notes
    respond_to do |format|
     #format.html { render :index }
     format.json { render json: @notes}
   end
  end

  def show
    respond_to do |format|
     #format.html { render :show }
     format.json { render json: @note}
   end
  end

  def create
    @note = Note.create(note_params)
    render json: @note, status: 201
  end

  def update
    @note.update(note_params)
    render json: @note
  end

  def destroy
    @note.destroy
  end

  #--------------------
  private

  def find_note
    @note = Note.find(params[:id])
  end

  def note_params #strong params
    params.require(:note).permit(:title, :content)
  end
end
