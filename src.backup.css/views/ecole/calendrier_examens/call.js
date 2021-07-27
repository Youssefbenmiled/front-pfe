{
    this.state.valueType.value == "classe" &&
    <>
        <Label>
            <h3>Niveau :</h3>
        </Label>
        <Select
            onChange={this.handleChangeNiveau}
            value={this.state.valueNiveau}
            options={levels}
            className="react-select"
            placeholder="Sélectionnez le niveau..."
            classNamePrefix="react-select"
            name="form-field-name"

        />
    </>
}
<br></br>
{
    this.state.valueNiveau.value != null &&
    <>
        <Label>
            <h3>Classe :</h3>
        </Label>
        <Select
            onChange={this.handleChangeClasse}
            value={this.state.valueClasse}
            options={cls}
            className="react-select"
            placeholder="Sélectionnez une classe..."
            classNamePrefix="react-select"
            name="form-field-name"

        />
    </>
}

<br></br>
{
    this.state.valueClasse.value != null ? (
        <div className="disable-text-selection">
            <ListPageHeading
                heading={"Calendrier des examens de la classe " + this.state.valueNiveau.label + "" + this.state.valueClasse.label}
                displayMode={displayMode}
                changeDisplayMode={this.changeDisplayMode}
                handleChangeSelectAll={this.handleChangeSelectAll}
                changeOrderBy={this.changeOrderBy}
                changePageSize={this.changePageSize}
                selectedPageSize={selectedPageSize}
                totalItemCount={totalItemCount}
                selectedOrderOption={selectedOrderOption}
                match={match}
                startIndex={startIndex}
                endIndex={endIndex}
                selectedItemsLength={selectedItems ? selectedItems.length : 0}
                itemsLength={items ? items.length : 0}
                onSearchKey={this.onSearchKey}
                orderOptions={orderOptions}
                pageSizes={pageSizes}
                toggleModal={this.toggleModal}
                toggleModalUpdate={this.toggleModalUpdate}
                toggleModalDelete={this.toggleModalDelete}
                selectedItemsUpdate={this.state.selectedItems.length == 1}
                selectedItemsDelete={this.state.selectedItems.length > 0}
                type={"classe"}
            />
            <UpdateModal
                modalOpen={modalOpenUpdate}
                toggleModal={this.toggleModalUpdate}
                setSt={this.setST}

            />
            <DeleteModal
                modalOpen={modalOpenDelete}
                toggleModal={this.toggleModalDelete}
                setSt={this.setST}
                selectedItems={this.state.selectedItems.length == 1}

            />
            <AddNewModal
                modalOpen={modalOpen}
                toggleModal={this.toggleModal}

            />
            <Row>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                    <input
                        type="text"
                        name="keyword"
                        id="search"
                        placeholder="Rechercher"
                        value={chercher}
                        onChange={this.chercher}
                    />
                </div>

                {this.state.items.map((emploi, i) => {
                    return (

                        <DataListView
                            key={emploi.id}
                            emploi={emploi}
                            isSelect={this.state.selectedItems.includes(emploi.id)}
                            onCheckItem={this.onCheckItem}
                            setEmploi={this.setEmploi}
                            toggleModalVoir={this.toggleModalVoir}
                            collect={collect}

                        />
                    );
                })

                }
                {chercher == "" ? (

                    <Pagination
                        currentPage={this.state.currentPage}
                        totalPage={this.state.totalPage}
                        onChangePage={i => this.onChangePage(i)}
                    />
                ) : null}
                <ContextMenuContainer
                    onContextMenuClick={this.onContextMenuClick}
                    onContextMenu={this.onContextMenu}
                    selectedItems={this.state.selectedItems.length == 1}
                    toggleModalUpdate={this.toggleModalUpdate}
                    toggleModalDelete={this.toggleModalDelete}

                />
            </Row>
            <UpdateModal
                modalOpen={modalOpenUpdate}
                toggleModal={this.toggleModalUpdate}
                selectedItems={this.state.selectedItems.length == 1}
                setSt={this.setST}
            />
        </div>

    ) : null
}
