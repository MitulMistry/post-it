class NotesController < ApplicationController
  def index
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

  #--------------------
  private

  def note_params #strong params
    params.require(:note).permit(:title, :content)
  end
end
