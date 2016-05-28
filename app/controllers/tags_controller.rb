class TagsController < ApplicationController
  before_action :find_tag, only: [:show, :update, :destroy]
  before_action :authorize_ownership, only: [:show, :update, :destroy] #:edit,

  #uses ActiveModel Serializer to implicitly serialize tag (render json: @tag), in serializers/tag_serializer.rb
  def index
    @tags = current_user.tags.order("name ASC")
    #render json: @tags
    respond_to do |format|
     #format.html { render :index }
     format.json { render json: @tags}
   end
  end

  def show #returns all the notes that are under this tag
    @tag_notes = @tag.notes.order('created_at DESC')
    respond_to do |format|
     #format.html { render :show }
     format.json { render json: @tag_notes}
   end
  end

  def create
    @tag = current_user.tags.create(tag_params)
    render json: @tag
  end

  def update
    @tag.update(tag_params)
  end

  def destroy
    @tag.destroy
    render nothing: true
  end

  #--------------------
  private

  def find_tag
    @tag = Tag.find(params[:id])
  end

  def authorize_ownership
    if @tag.user != current_user
      redirect_to root_path, alert: 'You do not have required permissions.'
    end
  end

  def tag_params #strong params
    params.require(:tag).permit(:name)
  end
end
