class TagsController < ApplicationController
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

  def tag_params #strong params
    params.require(:tag).permit(:name)
  end
end
